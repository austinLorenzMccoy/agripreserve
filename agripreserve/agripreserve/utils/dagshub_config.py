"""DAGsHub configuration for AgriPreserve."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
env_path = Path(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))).joinpath('.env')
load_dotenv(dotenv_path=env_path)

# DAGsHub credentials from environment variables
DAGSHUB_USERNAME = os.getenv("DAGSHUB_USERNAME", "")
DAGSHUB_TOKEN = os.getenv("DAGSHUB_TOKEN", "")
DAGSHUB_REPO = os.getenv("DAGSHUB_REPO", "agripreserve")

# MLflow tracking configuration
MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", f"https://dagshub.com/{DAGSHUB_USERNAME}/{DAGSHUB_REPO}.mlflow")
MLFLOW_TRACKING_USERNAME = os.getenv("MLFLOW_TRACKING_USERNAME", "dvc")
MLFLOW_TRACKING_PASSWORD = os.getenv("MLFLOW_TRACKING_PASSWORD", DAGSHUB_TOKEN)

# DVC remote configuration
DAGSHUB_REMOTE_URL = os.getenv("DAGSHUB_REMOTE_URL", f"https://dagshub.com/{DAGSHUB_USERNAME}/{DAGSHUB_REPO}.dvc")


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
