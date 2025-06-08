from azure.storage.blob import BlobServiceClient
from io import BytesIO
from PIL import Image
import numpy as np


conn_str = "<your-azure-blob-connection-string>"
blob_service = BlobServiceClient.from_connection_string(conn_str)
container = blob_service.get_container_client("<container-name>")

# List and download all image blobs
images = []
for blob in container.list_blobs():
    blob_client = container.get_blob_client(blob.name)
    data = blob_client.download_blob().readall()  # download_blob API:contentReference[oaicite:4]{index=4}
    img = Image.open(BytesIO(data)).convert("RGB")
    images.append(np.array(img))
print(f"Loaded {len(images)} images from blob storage")
