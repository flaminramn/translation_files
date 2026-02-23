from azure.storage.blob import BlobServiceClient
import json

# Replace with your real connection string
connection_string = "connection string"
container_name = "wab-scans"

blob_service_client = BlobServiceClient.from_connection_string(connection_string)
container_client = blob_service_client.get_container_client(container_name)

books = []
folders = set()

# List all blobs
for blob in container_client.list_blobs(name_starts_with="sources/"):
    parts = blob.name.split("/")
    if len(parts) >= 2:
        folder = parts[1]
        folders.add(folder)

book_id = 1

for folder in sorted(folders):
    book = {
        "BookId": book_id,
        "Title": folder,
        "FolderName": f"sources/{folder}",
        "PdfUrl": f"https://wabfiles.blob.core.windows.net/wab-scans/sources/{folder}/searchablepdf.pdf"
    }
    books.append(book)
    book_id += 1

with open("books.json", "w", encoding="utf-8") as f:
    json.dump(books, f, indent=2)

print("books.json created.")