from azure.cosmos import CosmosClient, exceptions
import csv
from dotenv import dotenv_values

# ─── Configuration ─────────────────────────────────────────────────────────────
config    = dotenv_values(".env")
ENDPOINT  = config["COSMOS_ENDPOINT"]
KEY       = config["COSMOS_KEY"]
DB_NAME   = config["COSMOS_DATABASE"]
CT_NAME   = config["COSMOS_CONTAINER"]
CSV_PATH  = "C:/Users/khush/Downloads/IFNDx_updated.csv"

# ─── Resume Settings ───────────────────────────────────────────────────────────
# Option 1: Resume from a specific ID
START_FROM_ID = "25000"   # ← Replace with your actual last uploaded ID
USE_ID_RESUME = True              # ← Set to False to use row index instead

# Option 2: Resume from a specific row number
START_ROW_INDEX = 13108           # ← Replace with desired row index
# (row 0 = header, row 1 = first row)

# ─── Connect to Cosmos DB ───────────────────────────────────────────────────────
client    = CosmosClient(ENDPOINT, credential=KEY)
database  = client.create_database_if_not_exists(id=DB_NAME)
container = database.create_container_if_not_exists(
    id=CT_NAME,
    partition_key="/id",         
    offer_throughput=400
)

# ─── Upload Logic ───────────────────────────────────────────────────────────────
skipping = True if USE_ID_RESUME else False

with open(CSV_PATH, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    for index, row in enumerate(reader):
        # Skip until reaching the desired ID or row index
        if USE_ID_RESUME:
            if skipping:
                if row["id"] == START_FROM_ID:
                    skipping = False
                continue
        else:
            if index < START_ROW_INDEX:
                continue

        try:
            container.create_item(body=row)
            print(f"✅ Uploaded: id={row['id']}")
        except exceptions.CosmosResourceExistsError:
            print(f"↺ Skipped (already exists): id={row['id']}")
        except Exception as e:
            print(f"⚠️ Failed for id={row.get('id')}: {e}")

print("✅ Upload complete.")


