from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from PIL import Image
import io
import os

app = FastAPI(title="Plant Disease AI", version="1.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
MODEL_URL = "https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/5"
IMG_SIZE = 224
NUM_CLASSES = 38

# PlantVillage Class Names
PLANTVILLAGE_CLASSES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry___Powdery_mildew', 'Cherry___healthy',
    'Corn___Cercospora_leaf_spot', 'Corn___Common_rust', 'Corn___Northern_Leaf_Blight', 'Corn___healthy',
    'Grape___Black_rot', 'Grape___Esca', 'Grape___Leaf_blight', 'Grape___healthy',
    'Orange___Haunglongbing',
    'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper_bell___Bacterial_spot', 'Pepper_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites', 'Tomato___Target_Spot',
    'Tomato___Yellow_Leaf_Curl_Virus', 'Tomato___mosaic_virus', 'Tomato___healthy'
]

# Global model variable
model = None

def load_model():
    """Load model using Functional API (fixes compatibility issue)"""
    global model
    
    print(f"🔄 Loading model from TensorFlow Hub: {MODEL_URL}")
    
    try:
        # Use Functional API instead of Sequential
        inputs = tf.keras.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
        
        # Load hub layer
        hub_layer = hub.KerasLayer(
            MODEL_URL,
            input_shape=(IMG_SIZE, IMG_SIZE, 3),
            trainable=False
        )
        
        # Build model using Functional API
        x = hub_layer(inputs)
        x = tf.keras.layers.Dropout(0.4)(x)
        x = tf.keras.layers.Dense(128, activation='relu')(x)
        x = tf.keras.layers.Dropout(0.3)(x)
        outputs = tf.keras.layers.Dense(NUM_CLASSES, activation='softmax')(x)
        
        model = tf.keras.Model(inputs=inputs, outputs=outputs)
        
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        print("✅ Model loaded successfully using Functional API!")
        return model
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        print("⚠️  Falling back to demo mode...")
        return None

def preprocess_image(image_bytes: bytes) -> tf.Tensor:
    """Preprocess image for model input"""
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_disease(image_bytes: bytes, crop_type: str = None):
    """Run prediction"""
    global model
    
    if model is None:
        load_model()
    
    # If model still None, return demo prediction
    if model is None:
        return get_demo_prediction(crop_type)
    
    try:
        img_tensor = preprocess_image(image_bytes)
        predictions = model.predict(img_tensor, verbose=0)
        confidence = float(np.max(predictions[0]))
        class_index = int(np.argmax(predictions[0]))
        
        disease_raw = PLANTVILLAGE_CLASSES[class_index] if class_index < len(PLANTVILLAGE_CLASSES) else "Unknown"
        
        if '___' in disease_raw:
            plant_name, disease_name = disease_raw.split('___')
        else:
            plant_name = crop_type or "Unknown"
            disease_name = disease_raw
        
        if confidence > 0.85:
            severity = "high"
        elif confidence > 0.65:
            severity = "medium"
        else:
            severity = "low"
        
        return {
            "plant": plant_name.replace('_', ' '),
            "disease": disease_name.replace('_', ' '),
            "confidence": round(confidence, 4),
            "severity": severity,
            "class_index": class_index
        }
        
    except Exception as e:
        print(f"⚠️  Prediction failed, using demo mode: {e}")
        return get_demo_prediction(crop_type)

def get_demo_prediction(crop_type: str = None):
    """Return demo prediction when model is not available"""
    import random
    
    demo_diseases = {
        "Tomato": [("Early Blight", 0.94), ("Late Blight", 0.87), ("Healthy", 0.91)],
        "Olive": [("Peacock Spot", 0.89), ("Olive Knot", 0.82), ("Healthy", 0.95)],
        "Potato": [("Early Blight", 0.91), ("Late Blight", 0.88), ("Healthy", 0.93)],
    }
    
    crop = crop_type or "Tomato"
    options = demo_diseases.get(crop, [("Leaf Spot", 0.85), ("Healthy", 0.90)])
    disease, confidence = random.choice(options)
    
    return {
        "plant": crop,
        "disease": disease,
        "confidence": confidence,
        "severity": "high" if confidence > 0.85 else "medium",
        "demo_mode": True
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    crop_type: str = Form(None),
    location: str = Form(None),
    lat: float = Form(None),
    lng: float = Form(None)
):
    try:
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        image_bytes = await file.read()
        result = predict_disease(image_bytes, crop_type)
        
        if location:
            result["location"] = location
        if lat and lng:
            result["coordinates"] = {"lat": lat, "lng": lng}
        
        return JSONResponse(content=result)
        
    except Exception as e:
        print(f"❌ Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/demo-prediction")
async def demo_prediction(crop_type: str = "Tomato"):
    return get_demo_prediction(crop_type)

if __name__ == "__main__":
    import uvicorn
    print("🌱 Starting Plant Disease AI Service...")
    print(f"📡 API will be available at: http://localhost:8000")
    print(f"🔍 Test endpoint: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)