"""DAGsHub configuration for AgriPreserve."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
env_path = Path(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))).joinpath('.env')
load_dotenv(dotenv_path=env_path)
print(f"Loading .env from: {env_path} (exists: {env_path.exists()})")


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
    """Set up the DAGsHub environment variables for DVC and MLflow."""
    # Set environment variables for DAGsHub
    os.environ["MLFLOW_TRACKING_URI"] = MLFLOW_TRACKING_URI
    os.environ["MLFLOW_TRACKING_USERNAME"] = MLFLOW_TRACKING_USERNAME
    os.environ["MLFLOW_TRACKING_PASSWORD"] = MLFLOW_TRACKING_PASSWORD
    
    # Set up basic authentication for MLflow
    import mlflow
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    
    # Set up HTTP basic auth
    from urllib.request import HTTPBasicAuthHandler, build_opener
    auth_handler = HTTPBasicAuthHandler()
    auth_handler.add_password(realm='DAGsHub',
                             uri=MLFLOW_TRACKING_URI,
                             user=MLFLOW_TRACKING_USERNAME,
                             passwd=MLFLOW_TRACKING_PASSWORD)
    opener = build_opener(auth_handler)
    mlflow.utils.rest_utils.http_request = opener.open
    
    print(f"DAGsHub environment configured for user: {DAGSHUB_USERNAME}")
    print(f"MLflow tracking URI: {MLFLOW_TRACKING_URI}")
    print(f"MLflow authentication set up with username: {MLFLOW_TRACKING_USERNAME}")
    
    # Disable SSL verification if needed (only for testing)
    import ssl
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
        print("Warning: SSL verification disabled for testing purposes only.")
        print("Re-enable SSL verification in production environments.")
        
    # For DVC
    os.environ["DAGSHUB_USERNAME"] = DAGSHUB_USERNAME
    os.environ["DAGSHUB_TOKEN"] = DAGSHUB_TOKEN
    os.environ["DAGSHUB_REPO_URL"] = f"https://dagshub.com/{DAGSHUB_USERNAME}/{DAGSHUB_REPO}.git"
