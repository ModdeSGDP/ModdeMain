from fastapi import FastAPI, UploadFile, File, HTTPException
from pinecone import Pinecone
import uvicorn
import boto3
from pymongo import MongoClient
from feature_extractor import extract_features
import uuid
import os
import shutil  # ✅ Fix: Missing import

app = FastAPI()

# Initialize Pinecone
pc = Pinecone(api_key="pcsk_gn4ag_R7CK4tBTkdzFBfYTnTTkDnyzdkvm5awyAbFu7it8u6GV1EwRTgGKJ77igpmv2ma")
index = pc.Index("image-search")

# Initialize MongoDB
client = MongoClient("mongodb+srv://admin:123@image-database-cluster.9ntoq.mongodb.net/")
db = client["image_search_db"]
products_collection = db["products"]

# Initialize S3
s3 = boto3.client("s3", aws_access_key_id="AKIA5FTY7XEP3JBHZ7XB ", aws_secret_access_key="YOUR_SECRET_KEY")
BUCKET_NAME = "your-s3-bucket-name"


@app.post("/upload")
async def upload_product(product_id: str, name: str, description: str, category: str, file: UploadFile = File(...)):
    try:
        # Save uploaded image locally
        img_path = f"temp_{uuid.uuid4()}.jpg"
        with open(img_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Upload image to S3
        s3_key = f"products/{uuid.uuid4()}.jpg"  # ✅ Fix: Avoid local file name in S3
        s3.upload_file(img_path, BUCKET_NAME, s3_key)
        image_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"

        # Extract features
        features = extract_features(img_path).tolist()
        image_id = str(uuid.uuid4())  # Generate UUID for Pinecone

        # Save to Pinecone
        index.upsert([(image_id, features, None)])  # ✅ Fix: Upsert format

        # Save metadata to MongoDB
        product_metadata = {
            "_id": product_id,
            "name": name,
            "description": description,
            "category": category,
            "image_url": image_url,
            "image_id": image_id,
            "__v": 0,
        }
        products_collection.insert_one(product_metadata)

        return {"message": "Product uploaded successfully", "image_id": image_id, "image_url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the temporary file
        if os.path.exists(img_path):
            os.remove(img_path)


@app.post("/search")
async def search_similar_images(file: UploadFile = File(...)):
    try:
        # Save uploaded image locally
        img_path = f"temp_{uuid.uuid4()}.jpg"
        with open(img_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract features
        query_features = extract_features(img_path).tolist()

        # Query Pinecone
        results = index.query(vector=query_features, top_k=5, include_metadata=False)  # ✅ Fix: Metadata handling

        # Get similar images and their metadata
        similar_images = []
        for match in results.matches:
            product = products_collection.find_one({"image_id": str(match.id)})  # ✅ Fix: Convert match.id to string
            if product:
                similar_images.append(product)

        return {"similar_images": similar_images}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the temporary file
        if os.path.exists(img_path):
            os.remove(img_path)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
