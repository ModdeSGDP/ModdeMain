import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import numpy as np

# Load Pre-trained Model
model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.IMAGENET1K_V1)
model.classifier = torch.nn.Identity()  
model.eval()  

# Image Preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize to the input size expected by the model
    transforms.ToTensor(),  # Convert image to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) 
])

def extract_features(img_path):
    """
    Extract features from an image using modified MobileNetV2.
    """
    img = Image.open(img_path).convert("RGB")  
    img = transform(img).unsqueeze(0)  

    with torch.no_grad():  
        features = model(img)

    return features.squeeze().numpy()  
