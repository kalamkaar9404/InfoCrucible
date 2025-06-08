from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import dotenv_values
from azure.cosmos import CosmosClient, PartitionKey
from azure.storage.blob import BlobServiceClient
import openai
import uuid

# 2) Load environment variables
config = dotenv_values(".env")
AZURE_OPENAI_ENDPOINT = config["AZURE_OPENAI_ENDPOINT"]
AZURE_OPENAI_KEY      = config["AZURE_OPENAI_KEY"]       
AZURE_OPENAI_MODEL    = config["AZURE_OPENAI_MODEL"]

COSMOS_ENDPOINT  = config["COSMOS_ENDPOINT"]
COSMOS_KEY       = config["COSMOS_KEY"]
COSMOS_DATABASE  = config["COSMOS_DATABASE"]
COSMOS_CONTAINER = config["COSMOS_CONTAINER"]

STORAGE_CONN_STR    = config["STORAGE_CONN_STR"]
STORAGE_CONTAINER   = config["STORAGE_CONTAINER"]

# 3) Set up Azure OpenAI client
openai.api_type    = "azure"
openai.api_base    = AZURE_OPENAI_ENDPOINT
openai.api_version = "2024-05-01-preview"
openai.api_key     = AZURE_OPENAI_KEY

# 4) Set up Cosmos DB client
cosmos_client = CosmosClient(COSMOS_ENDPOINT, credential=COSMOS_KEY)
database = cosmos_client.create_database_if_not_exists(id=COSMOS_DATABASE)
container = database.create_container_if_not_exists(
    id=COSMOS_CONTAINER,
    partition_key=PartitionKey(path="/id"),
    
)

# 5) Set up Blob Storage client
blob_service_client = BlobServiceClient.from_connection_string(STORAGE_CONN_STR)
try:
    blob_service_client.create_container(STORAGE_CONTAINER)
except Exception:
    pass  # container may already exist
container_client = blob_service_client.get_container_client(STORAGE_CONTAINER)

# 6) Create FastAPI app
app = FastAPI()

# 7) Enable CORS for local React (http://localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 8) Define your routes AFTER the setup above

@app.post("/scan_text")
async def scan_text(item: dict):
    """
    Expect JSON {"text": "..."} or {"url": "..."}.
    Uses Azure OpenAI to analyze content, e.g. check authenticity and find sources.
    """
    text = item.get("text") or item.get("url") or ""
    prompt = (
        f"Analyze the following content for misinformation and source authenticity. "
        f"Provide: authenticity_percentage, fake_percentage, and relevant source URLs.\n\nContent: {text}"
    )

    # Call Azure OpenAI
    resp = openai.ChatCompletion.create(
        deployment_id=AZURE_OPENAI_MODEL,
        messages=[{"role": "user", "content": prompt}],
    )
    result_text = resp.choices[0].message.content

    # Simplified parsing—use json.loads in production
    try:
        analysis = eval(result_text)
    except:
        analysis = {"authenticity": None, "fake": None, "sources": []}

    # Store in Cosmos DB
    record = {
        "id": str(uuid.uuid4()),
        "content": text,
        "analysis": analysis
    }
    container.upsert_item(record)
    return {"analysis": analysis}


@app.post("/scan_image")
async def scan_image(file: UploadFile = File(...)):
    """
    Accepts an image upload, stores it in Blob Storage, and uses Azure OpenAI or Vision to analyze.
    """
    contents = await file.read()
    blob_client = container_client.get_blob_client(file.filename)
    blob_client.upload_blob(contents, overwrite=True)

    # Placeholder analysis—swap in real vision model call if available
    analysis = {
        "authenticity": 80,
        "deepfake": False,
        "description": "Sample image analysis description",
    }

    # Store in Cosmos DB
    record = {
        "id": str(uuid.uuid4()),
        "image_name": file.filename,
        "analysis": analysis
    }
    container.upsert_item(record)
    return {"analysis": analysis}


@app.get("/stats")
async def get_stats():
    """
    Returns simple stats, e.g. count of scanned items.
    """
    query = "SELECT VALUE COUNT(1) FROM c"
    count = list(container.query_items(
        query=query, enable_cross_partition_query=True
    ))[0]
    return {"total_scans": count}

