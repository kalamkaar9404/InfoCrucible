from azure.cosmos import CosmosClient
from dotenv import dotenv_values


config    = dotenv_values(".env")

url = config["COSMOS_ENDPOIINT"]
key = config["COSMOS_KEY"]
if not url or not key:
    raise ValueError("ACCOUNT_URI or ACCOUNT_KEY is not set")

# Create the Cosmos client
client = CosmosClient(url, credential=key)
database_name = config["COSMOS_DATABASE"]
container_name = config["COSMOS_CONTAINER"]
database_client = client.get_database_client(database_name)
container_client = database_client.get_container_client(container_name)

# Read all items from the container
items = list(container_client.read_all_items())
print(f"Retrieved {len(items)} items from Cosmos DB container.")

# Or query items
for item in container_client.query_items(
        query="SELECT * FROM c WHERE c.type = @type",
        parameters=[{"name":"@type", "value":"example"}],
        enable_cross_partition_query=True):
    print(item)