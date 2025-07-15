import torch
import torch.nn as nn
from torchvision import models, datasets, transforms
from torchvision.models import AlexNet_Weights
from PIL import Image
import os

def deep_learning_prediction(image_paths):
    if not image_paths:
        print("⚠️ No images provided for prediction.")
        return None
    
    # Set device (GPU or CPU)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Define number of classes
    num_classes = 16  # Update this to match your dataset

    # Load the model architecture
    model = models.alexnet(weights=AlexNet_Weights.IMAGENET1K_V1)
    model.classifier[6] = nn.Linear(model.classifier[6].in_features, num_classes)
    model = model.to(device)

    # Load the saved model weights
    model_path = "vitamin_deficiency_model_final.pth"  # Ensure correct path
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()  # Set model to evaluation mode
    print("✅ Model loaded successfully!")

    # Define inference transformations (without random augmentations)
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])

    # Training dataset directory
    train_dir = "FINAL_DATASET/train"

    # Load dataset to get class labels
    train_dataset = datasets.ImageFolder(root=train_dir)



    # Initialize cumulative probabilities
    cumulative_probabilities = {cls: 0.0 for cls in train_dataset.classes}

    for image_path in image_paths:
        image = Image.open(image_path).convert("RGB")
        image = transform(image).unsqueeze(0).to(device)  # Preprocess the image

        with torch.no_grad():
            output = model(image)
            probabilities = torch.sigmoid(output).cpu().numpy()[0]  # Get probabilities

        # Store class probabilities
        class_probabilities = {train_dataset.classes[i]: probabilities[i] for i in range(num_classes)}

        # Accumulate probabilities
        for cls, prob in class_probabilities.items():
            cumulative_probabilities[cls] += prob

        print(f"\n🔹 Image: {os.path.basename(image_path)}")
        print("\nAll Class Probabilities for this Image:")
        for cls, prob in class_probabilities.items():
            print(f"{cls}: {prob:.4f}")

    # Print cumulative probabilities
    print("\n🔹 Cumulative Probabilities Across All Images:")
    for cls, prob in cumulative_probabilities.items():
        print(f"{cls}: {prob:.4f}")

    # Get the class with the highest probability
    highest_class = max(cumulative_probabilities, key=cumulative_probabilities.get)
    highest_prob = cumulative_probabilities[highest_class]

    print(f"\n🟢 Predicted Deficiency: {highest_class} ({highest_prob:.4f})")
    return highest_class
