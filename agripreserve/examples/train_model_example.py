"""Example script for training the loss prediction model with DVC and MLflow tracking."""

import os
import sys
import pandas as pd
from pathlib import Path

# Add the parent directory to the path so we can import the agripreserve package
sys.path.append(str(Path(__file__).parent.parent))

from agripreserve.data.loader import load_datasets
from agripreserve.models.loss_prediction_model import LossPredictionModel
from agripreserve.utils.dagshub_config import setup_dagshub_environment
from agripreserve.utils.dvc_utils import track_file


def main():
    """Train the loss prediction model and track with DVC and MLflow."""
    print("Loading datasets...")
    loss_percentage_df, loss_tonnes_df = load_datasets()
    
    # Set up DAGsHub environment
    setup_dagshub_environment()
    
    # Create model directory if it doesn't exist
    model_dir = Path(__file__).parent.parent / "agripreserve" / "models"
    os.makedirs(model_dir, exist_ok=True)
    
    print("Training Random Forest model...")
    rf_model = LossPredictionModel(model_type="random_forest")
    rf_metrics = rf_model.train(loss_percentage_df, loss_tonnes_df, track_with_mlflow=True)
    
    print("Training Linear model...")
    linear_model = LossPredictionModel(model_type="linear")
    linear_metrics = linear_model.train(loss_percentage_df, loss_tonnes_df, track_with_mlflow=True)
    
    # Track model files with DVC
    rf_model_path = str(model_dir / "loss_prediction_random_forest.joblib")
    linear_model_path = str(model_dir / "loss_prediction_linear.joblib")
    
    print("Tracking model files with DVC...")
    track_file(rf_model_path, "Add trained Random Forest model")
    track_file(linear_model_path, "Add trained Linear model")
    
    # Print metrics
    print("\nTraining Results:")
    
    print("\nRandom Forest Model:")
    for metric, value in rf_metrics.items():
        print(f"  - {metric}: {value:.4f}")
    
    print("\nLinear Model:")
    for metric, value in linear_metrics.items():
        print(f"  - {metric}: {value:.4f}")
    
    # Make some example predictions
    print("\nExample Predictions:")
    
    test_cases = [
        {"state": "Kano", "region": "Northern", "crop": "Maize", "tonnes": 1000},
        {"state": "Lagos", "region": "Southern", "crop": "Rice", "tonnes": 500},
        {"state": "Plateau", "region": "Middle Belt", "crop": "Sorghum", "tonnes": 750}
    ]
    
    for case in test_cases:
        rf_pred = rf_model.predict(case["state"], case["region"], case["crop"], case["tonnes"])
        linear_pred = linear_model.predict(case["state"], case["region"], case["crop"], case["tonnes"])
        
        print(f"\nPrediction for {case['crop']} in {case['state']} ({case['tonnes']} tonnes):")
        print(f"  - Random Forest: {rf_pred:.2f}% loss")
        print(f"  - Linear Model: {linear_pred:.2f}% loss")


if __name__ == "__main__":
    main()
