"""DAGsHub configuration for AgriPreserve."""

import os

# DAGsHub credentials
DAGSHUB_USERNAME = "austinLorenzMccoy"
DAGSHUB_TOKEN = "1d06b3f1dc94bb2bb3ed0960c7d406847b9d362d"
DAGSHUB_REPO = "agripreserve"  # Update this to your new repository name

# MLflow tracking configuration
MLFLOW_TRACKING_URI = f"https://dagshub.com/{DAGSHUB_USERNAME}/{DAGSHUB_REPO}.mlflow"
MLFLOW_TRACKING_USERNAME = DAGSHUB_USERNAME
MLFLOW_TRACKING_PASSWORD = DAGSHUB_TOKEN

# DVC remote configuration
DAGSHUB_REMOTE_URL = f"https://dagshub.com/{DAGSHUB_USERNAME}/{DAGSHUB_REPO}.dvc"


def setup_dagshub_environment():
    """Set up environment variables for DAGsHub integration."""
    os.environ["MLFLOW_TRACKING_URI"] = MLFLOW_TRACKING_URI
    os.environ["MLFLOW_TRACKING_USERNAME"] = MLFLOW_TRACKING_USERNAME
    os.environ["MLFLOW_TRACKING_PASSWORD"] = MLFLOW_TRACKING_PASSWORD
    
    # For DVC
    os.environ["DAGSHUB_USERNAME"] = DAGSHUB_USERNAME
    os.environ["DAGSHUB_TOKEN"] = DAGSHUB_TOKEN
    os.environ["DAGSHUB_REPO_URL"] = f"https://dagshub.com/{DAGSHUB_USERNAME}/{DAGSHUB_REPO}.git"
    
    print(f"DAGsHub environment configured for user: {DAGSHUB_USERNAME}")
    print(f"MLflow tracking URI: {MLFLOW_TRACKING_URI}")
