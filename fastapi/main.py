from fastapi import FastAPI, UploadFile, File, HTTPException
from pymongo import MongoClient
from pinecone import Pinecone
import uvicorn
import shutil
import uuid
from feature_extractor import extract_features
import boto3
from botocore.exceptions import NoCredentialsError

app = FastAPI()

# Initialize Pinecone Client
pc = Pinecone(api_key="pcsk_gn4ag_R7CK4tBTkdzFBfYTnTTkDnyzdkvm5awyAbFu7it8u6GV1EwRTgGKJ77igpmv2ma")
index = pc.Index("image-search")

# Initialize MongoDB Client
# Use the MongoDB Atlas URI instead of localhost
MONGODB_URI = "mongodb+srv://admin:123@image-database-cluster.9ntoq.mongodb.net/"
# Initialize MongoDB Client
client = MongoClient(MONGODB_URI)
# Select the database (replace 'image_search_db' with your actual database name if different)
db = client["image_database"]
# Select the collection
products_collection = db["images"]

# Initialize S3 Client
s3 = boto3.client('s3', aws_access_key_id='AKIA5FTY7XEP3JBHZ7XB', aws_secret_access_key='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')
BUCKET_NAME = 'modde-test-img-storage'

@app.post("/add_product")
async def add_product(product_id: str, name: str, description: str, category: str, file: UploadFile = File(...)):
    try:
        # Save uploaded image locally
        img_path = f"temp_{uuid.uuid4()}.jpg"
        with open(img_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Upload image to S3
        s3_key = f"products/{img_path}"  # S3 key (path) for the image
        try:
            s3.upload_file(img_path, BUCKET_NAME, s3_key)
            image_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"
        except NoCredentialsError:
            raise HTTPException(status_code=500, detail="S3 credentials not available")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload image to S3: {str(e)}")

        # Extract features from the image
        features = extract_features(img_path).tolist()
        image_id = str(uuid.uuid4())  # Generate a unique ID for the image

        # Store metadata in MongoDB
        # Store metadata in MongoDB
        product_metadata = {
            "_id": product_id,  # Use the provided product_id as the MongoDB _id
            "name": name,
            "description": description,
            "category": category,
            "image_url": image_url,  # Automatically generated S3 URL
            "image_id": image_id,     # UUID for Pinecone
            "__v": 0                  # Version key, default to 0
        }
        products_collection.insert_one(product_metadata)

        # Upsert features into Pinecone
        index.upsert([(image_id, features)])

        return {"message": "Product added successfully", "image_id": image_id, "image_url": image_url}
    except Exception as e:
        print("Error in /add_product endpoint:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the temporary image file
        import os
        if os.path.exists(img_path):
            os.remove(img_path)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)