"""Metrics tracking module for AgriPreserve using MLflow and DVC."""

import os
import pandas as pd
import numpy as np
import json
from datetime import datetime
from typing import Dict, Any, Optional, List, Tuple

from agripreserve.utils.mlflow_utils import (
    setup_mlflow_tracking,
    start_run,
    log_metrics,
    log_params,
    log_artifacts,
    end_run
)
from agripreserve.utils.dvc_utils import (
    track_file,
    track_directory,
    setup_dagshub_remote,
    push_to_remote
)


class MetricsTracker:
    """Class for tracking metrics using MLflow and DVC."""
    
    def __init__(
        self,
        experiment_name: str = "agripreserve_metrics",
        metrics_dir: str = "metrics",
        data_dir: str = "data",
        dagshub_repo_url: Optional[str] = None
    ):
        """
        Initialize the metrics tracker.
        
        Args:
            experiment_name: Name of the MLflow experiment.
            metrics_dir: Directory to store metrics files.
            data_dir: Directory to store data files.
            dagshub_repo_url: URL of the DAGsHub repository.
        """
        self.experiment_name = experiment_name
        self.metrics_dir = metrics_dir
        self.data_dir = data_dir
        self.dagshub_repo_url = dagshub_repo_url
        
        # Create directories if they don't exist
        os.makedirs(self.metrics_dir, exist_ok=True)
        os.makedirs(self.data_dir, exist_ok=True)
        
        # Set up MLflow tracking
        if dagshub_repo_url:
            # Extract username and repo name from URL
            parts = dagshub_repo_url.strip("/").split("/")
            if len(parts) >= 2:
                username = parts[-2]
                repo_name = parts[-1].replace(".git", "")
                
                # Set MLflow tracking URI for DAGsHub
                tracking_uri = f"https://dagshub.com/{username}/{repo_name}.mlflow"
                setup_mlflow_tracking(tracking_uri, experiment_name)
                
                # Set up DVC remote for DAGsHub
                setup_dagshub_remote(dagshub_repo_url)
            else:
                print("Invalid DAGsHub repository URL")
                setup_mlflow_tracking(experiment_name=experiment_name)
        else:
            setup_mlflow_tracking(experiment_name=experiment_name)
    
    def track_loss_metrics(
        self,
        loss_percentage_df: pd.DataFrame,
        loss_tonnes_df: pd.DataFrame,
        run_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Track loss metrics using MLflow and DVC.
        
        Args:
            loss_percentage_df: DataFrame with loss percentage data.
            loss_tonnes_df: DataFrame with loss tonnage data.
            run_name: Optional name for the MLflow run.
            
        Returns:
            Dictionary with tracking results.
        """
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        run_name = run_name or f"loss_metrics_{timestamp}"
        
        # Calculate metrics
        metrics = self._calculate_loss_metrics(loss_percentage_df, loss_tonnes_df)
        
        # Save metrics to file
        metrics_file = os.path.join(self.metrics_dir, f"metrics_{timestamp}.json")
        with open(metrics_file, "w") as f:
            json.dump(metrics, f, indent=2)
        
        # Save DataFrames to CSV
        percentage_file = os.path.join(self.data_dir, f"loss_percentage_{timestamp}.csv")
        tonnes_file = os.path.join(self.data_dir, f"loss_tonnes_{timestamp}.csv")
        
        loss_percentage_df.to_csv(percentage_file, index=False)
        loss_tonnes_df.to_csv(tonnes_file, index=False)
        
        # Track files with DVC
        track_file(metrics_file, f"Add metrics file for {run_name}")
        track_file(percentage_file, f"Add loss percentage data for {run_name}")
        track_file(tonnes_file, f"Add loss tonnage data for {run_name}")
        
        # Log metrics to MLflow
        with start_run(run_name=run_name):
            # Log parameters
            params = {
                "num_states": len(loss_percentage_df["State"].unique()),
                "num_regions": len(loss_percentage_df["Region"].unique()),
                "timestamp": timestamp
            }
            log_params(params)
            
            # Log metrics
            log_metrics(metrics)
            
            # Log artifacts
            log_artifacts([metrics_file, percentage_file, tonnes_file])
        
        # Push to DAGsHub if URL is provided
        if self.dagshub_repo_url:
            push_result = push_to_remote()
            if not push_result["success"]:
                print(f"Warning: Failed to push to remote: {push_result['output']}")
        
        return {
            "success": True,
            "metrics": metrics,
            "files": {
                "metrics": metrics_file,
                "percentage": percentage_file,
                "tonnes": tonnes_file
            }
        }
    
    def _calculate_loss_metrics(
        self,
        loss_percentage_df: pd.DataFrame,
        loss_tonnes_df: pd.DataFrame
    ) -> Dict[str, float]:
        """
        Calculate metrics from loss data.
        
        Args:
            loss_percentage_df: DataFrame with loss percentage data.
            loss_tonnes_df: DataFrame with loss tonnage data.
            
        Returns:
            Dictionary of calculated metrics.
        """
        metrics = {}
        
        # Calculate total losses by crop
        for crop in ["Maize", "Rice", "Sorghum", "Millet"]:
            # Total loss in tonnes
            metrics[f"total_loss_{crop}_tonnes"] = loss_tonnes_df[crop].sum()
            
            # Average loss percentage
            valid_percentages = loss_percentage_df[loss_percentage_df[crop] > 0][crop]
            metrics[f"avg_loss_{crop}_percentage"] = valid_percentages.mean() if not valid_percentages.empty else 0
        
        # Calculate regional metrics
        for region in loss_percentage_df["Region"].unique():
            region_tonnes_df = loss_tonnes_df[loss_tonnes_df["Region"] == region]
            
            # Total loss in tonnes by region
            total_region_loss = 0
            for crop in ["Maize", "Rice", "Sorghum", "Millet"]:
                total_region_loss += region_tonnes_df[crop].sum()
            
            metrics[f"total_loss_{region}_tonnes"] = total_region_loss
        
        # Overall metrics
        metrics["total_food_loss_tonnes"] = sum(metrics[f"total_loss_{crop}_tonnes"] for crop in ["Maize", "Rice", "Sorghum", "Millet"])
        metrics["avg_loss_percentage"] = np.mean([metrics[f"avg_loss_{crop}_percentage"] for crop in ["Maize", "Rice", "Sorghum", "Millet"]])
        
        return metrics


def setup_dagshub_credentials():
    """Set up DAGsHub credentials from environment variables."""
    dagshub_token = os.environ.get("DAGSHUB_TOKEN")
    if dagshub_token:
        os.environ["MLFLOW_TRACKING_USERNAME"] = "dvc"
        os.environ["MLFLOW_TRACKING_PASSWORD"] = dagshub_token
    else:
        print("Warning: DAGSHUB_TOKEN environment variable not set. Authentication may fail.")
