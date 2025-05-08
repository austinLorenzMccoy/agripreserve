"""Test DAGsHub connection directly using the dagshub Python client."""

import os
from pathlib import Path
from dotenv import load_dotenv
import dagshub

# Load environment variables from .env file
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)
print(f"Loading .env from: {env_path} (exists: {env_path.exists()})")

# Get DAGsHub credentials from environment variables
dagshub_username = os.getenv("DAGSHUB_USERNAME")
dagshub_token = os.getenv("DAGSHUB_TOKEN")
dagshub_repo = os.getenv("DAGSHUB_REPO")

print(f"DAGsHub Username: {dagshub_username}")
print(f"DAGsHub Token: {dagshub_token[:5]}..." if dagshub_token else "DAGsHub Token: None")
print(f"DAGsHub Repo: {dagshub_repo}")

# Add app token for authentication
print("\nAdding DAGsHub app token...")
dagshub.auth.add_app_token(dagshub_token)

# Initialize DAGsHub repository
print("\nInitializing DAGsHub repository...")
dagshub.init(repo_owner=dagshub_username, repo_name=dagshub_repo, mlflow=True)

# Test MLflow connection
print("\nTesting MLflow connection...")
import mlflow
from mlflow.tracking import MlflowClient

# Get MLflow tracking URI
mlflow_tracking_uri = os.getenv("MLFLOW_TRACKING_URI", f"https://dagshub.com/{dagshub_username}/{dagshub_repo}.mlflow")
print(f"MLflow Tracking URI: {mlflow_tracking_uri}")

# Set MLflow tracking URI
mlflow.set_tracking_uri(mlflow_tracking_uri)

# List experiments
client = MlflowClient()
experiments = client.search_experiments()
print("\nExisting MLflow Experiments:")
for experiment in experiments:
    print(f"  - {experiment.name} (ID: {experiment.experiment_id})")

# Test creating a new run
print("\nCreating a test MLflow run...")
with mlflow.start_run(run_name="test_connection") as run:
    mlflow.log_param("test_param", "test_value")
    mlflow.log_metric("test_metric", 1.0)
    print(f"Run ID: {run.info.run_id}")
    print(f"Run URL: {mlflow_tracking_uri}/#/experiments/0/runs/{run.info.run_id}")

print("\nDAGsHub connection test completed successfully!")
