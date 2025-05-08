"""MLflow utilities for AgriPreserve."""

import os
import mlflow
from typing import Dict, Any, Optional, Union, List


def setup_mlflow_tracking(
    tracking_uri: Optional[str] = None,
    experiment_name: str = "agripreserve_experiments"
) -> None:
    """
    Set up MLflow tracking.
    
    Args:
        tracking_uri: MLflow tracking URI. If None, will use MLFLOW_TRACKING_URI environment variable
                      or local 'mlruns' directory.
        experiment_name: Name of the MLflow experiment.
    """
    # Set tracking URI from parameter, environment variable, or default to local
    if tracking_uri:
        mlflow.set_tracking_uri(tracking_uri)
    elif os.environ.get("MLFLOW_TRACKING_URI"):
        mlflow.set_tracking_uri(os.environ.get("MLFLOW_TRACKING_URI"))
    
    # Set or create the experiment
    try:
        mlflow.set_experiment(experiment_name)
    except Exception as e:
        print(f"Error setting up MLflow experiment: {e}")
        print("Defaulting to 'Default' experiment")


def log_metrics(
    metrics: Dict[str, Union[float, int]],
    step: Optional[int] = None
) -> None:
    """
    Log metrics to MLflow.
    
    Args:
        metrics: Dictionary of metric names and values.
        step: Step value for the metrics.
    """
    try:
        mlflow.log_metrics(metrics, step=step)
    except Exception as e:
        print(f"Error logging metrics to MLflow: {e}")


def log_params(params: Dict[str, Any]) -> None:
    """
    Log parameters to MLflow.
    
    Args:
        params: Dictionary of parameter names and values.
    """
    try:
        mlflow.log_params(params)
    except Exception as e:
        print(f"Error logging parameters to MLflow: {e}")


def log_artifacts(artifact_paths: List[str]) -> None:
    """
    Log artifacts to MLflow.
    
    Args:
        artifact_paths: List of paths to artifacts to log.
    """
    try:
        for path in artifact_paths:
            if os.path.exists(path):
                mlflow.log_artifact(path)
            else:
                print(f"Warning: Artifact path {path} does not exist")
    except Exception as e:
        print(f"Error logging artifacts to MLflow: {e}")


def start_run(
    run_name: Optional[str] = None,
    tags: Optional[Dict[str, str]] = None
) -> mlflow.ActiveRun:
    """
    Start an MLflow run.
    
    Args:
        run_name: Name of the run.
        tags: Dictionary of tags for the run.
        
    Returns:
        MLflow ActiveRun object.
    """
    try:
        return mlflow.start_run(run_name=run_name, tags=tags)
    except Exception as e:
        print(f"Error starting MLflow run: {e}")
        # Return a dummy context manager if MLflow fails
        from contextlib import nullcontext
        return nullcontext()


def end_run() -> None:
    """End the current MLflow run."""
    try:
        mlflow.end_run()
    except Exception as e:
        print(f"Error ending MLflow run: {e}")
