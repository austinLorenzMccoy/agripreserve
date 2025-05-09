"""Example script for tracking metrics with DVC and MLflow."""

import os
import sys
import pandas as pd
from pathlib import Path
from dotenv import load_dotenv

# Add the parent directory to the path so we can import the agripreserve package
sys.path.append(str(Path(__file__).parent.parent))

# Load environment variables from .env file
env_path = Path(__file__).parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path)
print(f"Loading .env from: {env_path} (exists: {env_path.exists()})")

from agripreserve.data.loader import load_datasets
from agripreserve.utils.metrics_tracker import MetricsTracker
from agripreserve.utils.dagshub_config import setup_dagshub_environment


def main():
    """Run the metrics tracking example."""
    print("Loading datasets...")
    loss_percentage_df, loss_tonnes_df = load_datasets()
    
    # Set up DAGsHub environment
    setup_dagshub_environment()
    
    # Get DAGsHub repository URL from environment
    dagshub_repo_url = os.environ.get("DAGSHUB_REPO_URL")
    
    # Create metrics tracker
    metrics_dir = Path(__file__).parent.parent / "metrics"
    data_dir = Path(__file__).parent.parent / "data"
    
    print(f"Setting up metrics tracker with directories:")
    print(f"  - Metrics directory: {metrics_dir}")
    print(f"  - Data directory: {data_dir}")
    
    tracker = MetricsTracker(
        experiment_name="agripreserve_loss_analysis",
        metrics_dir=str(metrics_dir),
        data_dir=str(data_dir),
        dagshub_repo_url=dagshub_repo_url
    )
    
    # Track metrics
    print("Tracking loss metrics...")
    result = tracker.track_loss_metrics(
        loss_percentage_df=loss_percentage_df,
        loss_tonnes_df=loss_tonnes_df,
        run_name="initial_loss_analysis"
    )
    
    if result["success"]:
        print("Successfully tracked metrics!")
        print(f"Metrics file: {result['files']['metrics']}")
        print(f"Loss percentage data: {result['files']['percentage']}")
        print(f"Loss tonnage data: {result['files']['tonnes']}")
        
        print("\nTracked metrics:")
        for key, value in result["metrics"].items():
            print(f"  - {key}: {value:.2f}")
    else:
        print("Failed to track metrics.")


if __name__ == "__main__":
    # Create necessary directories
    os.makedirs(Path(__file__).parent.parent / "metrics", exist_ok=True)
    os.makedirs(Path(__file__).parent.parent / "data", exist_ok=True)
    
    main()
