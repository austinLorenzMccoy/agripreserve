"""Post-harvest loss prediction model for AgriPreserve."""

import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib
import mlflow
import mlflow.sklearn

from agripreserve.data.loader import load_datasets
from agripreserve.utils.mlflow_utils import (
    setup_mlflow_tracking,
    start_run,
    log_metrics,
    log_params,
    log_artifacts,
    end_run
)


class LossPredictionModel:
    """Model for predicting post-harvest losses."""
    
    def __init__(self, model_type="random_forest"):
        """
        Initialize the loss prediction model.
        
        Args:
            model_type: Type of model to use ('random_forest' or 'linear').
        """
        self.model_type = model_type
        self.model = None
        self.preprocessor = None
        self.model_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            f"loss_prediction_{model_type}.joblib"
        )
    
    def _prepare_data(self, loss_percentage_df, loss_tonnes_df):
        """
        Prepare data for training.
        
        Args:
            loss_percentage_df: DataFrame with loss percentage data.
            loss_tonnes_df: DataFrame with loss tonnage data.
            
        Returns:
            X_train, X_test, y_train, y_test: Train and test data.
        """
        # Combine data
        df = pd.merge(
            loss_percentage_df,
            loss_tonnes_df,
            on=["State", "Region"],
            suffixes=("_percentage", "_tonnes")
        )
        
        # Prepare features and target
        # For each crop, we'll predict the loss percentage based on region, state, and tonnage
        crops = ["Maize", "Rice", "Sorghum", "Millet"]
        
        # Create a dataset for each crop
        all_data = []
        
        for crop in crops:
            crop_data = df[["State", "Region", f"{crop}_percentage", f"{crop}_tonnes"]].copy()
            crop_data["Crop"] = crop
            crop_data.rename(columns={
                f"{crop}_percentage": "Loss_Percentage",
                f"{crop}_tonnes": "Loss_Tonnes"
            }, inplace=True)
            all_data.append(crop_data)
        
        # Combine all crop data
        combined_df = pd.concat(all_data, ignore_index=True)
        
        # Filter out rows with zero loss (might indicate missing data)
        combined_df = combined_df[combined_df["Loss_Tonnes"] > 0]
        
        # Features and target
        X = combined_df[["State", "Region", "Crop", "Loss_Tonnes"]]
        y = combined_df["Loss_Percentage"]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        return X_train, X_test, y_train, y_test
    
    def train(self, loss_percentage_df, loss_tonnes_df, track_with_mlflow=True):
        """
        Train the model.
        
        Args:
            loss_percentage_df: DataFrame with loss percentage data.
            loss_tonnes_df: DataFrame with loss tonnage data.
            track_with_mlflow: Whether to track the training with MLflow.
            
        Returns:
            Dictionary with training metrics.
        """
        # Prepare data
        X_train, X_test, y_train, y_test = self._prepare_data(
            loss_percentage_df, loss_tonnes_df
        )
        
        # Define preprocessing for categorical features
        categorical_features = ["State", "Region", "Crop"]
        categorical_transformer = OneHotEncoder(handle_unknown="ignore")
        
        # Create preprocessor
        self.preprocessor = ColumnTransformer(
            transformers=[
                ("cat", categorical_transformer, categorical_features)
            ],
            remainder="passthrough"
        )
        
        # Create model pipeline
        if self.model_type == "random_forest":
            model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42
            )
        else:
            model = LinearRegression()
        
        # Create pipeline
        pipeline = Pipeline([
            ("preprocessor", self.preprocessor),
            ("model", model)
        ])
        
        # Train model
        pipeline.fit(X_train, y_train)
        self.model = pipeline
        
        # Evaluate model
        y_pred = self.model.predict(X_test)
        
        # Calculate metrics
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        metrics = {
            "mse": mse,
            "rmse": rmse,
            "mae": mae,
            "r2": r2
        }
        
        # Save model
        joblib.dump(self.model, self.model_path)
        
        # Track with MLflow if requested
        if track_with_mlflow:
            with start_run(run_name=f"loss_prediction_{self.model_type}"):
                # Log parameters
                params = {
                    "model_type": self.model_type,
                    "n_features": X_train.shape[1],
                    "n_samples": X_train.shape[0]
                }
                
                if self.model_type == "random_forest":
                    params.update({
                        "n_estimators": 100,
                        "max_depth": 10,
                        "random_state": 42
                    })
                
                log_params(params)
                
                # Log metrics
                log_metrics(metrics)
                
                # Log model
                mlflow.sklearn.log_model(self.model, "model")
                
                # Log artifacts
                log_artifacts([self.model_path])
        
        return metrics
    
    def predict(self, state, region, crop, loss_tonnes):
        """
        Predict loss percentage.
        
        Args:
            state: State name.
            region: Region name.
            crop: Crop name.
            loss_tonnes: Loss in tonnes.
            
        Returns:
            Predicted loss percentage.
        """
        if self.model is None:
            if os.path.exists(self.model_path):
                self.model = joblib.load(self.model_path)
            else:
                raise ValueError("Model not trained or loaded")
        
        # Create input data
        input_data = pd.DataFrame({
            "State": [state],
            "Region": [region],
            "Crop": [crop],
            "Loss_Tonnes": [loss_tonnes]
        })
        
        # Make prediction
        prediction = self.model.predict(input_data)[0]
        
        return prediction
    
    def load(self):
        """Load the model from disk."""
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            return True
        return False


def train_and_save_models():
    """Train and save both model types."""
    # Load data
    loss_percentage_df, loss_tonnes_df = load_datasets()
    
    # Set up MLflow tracking
    setup_mlflow_tracking(experiment_name="loss_prediction_models")
    
    # Train random forest model
    rf_model = LossPredictionModel(model_type="random_forest")
    rf_metrics = rf_model.train(loss_percentage_df, loss_tonnes_df)
    
    # Train linear model
    linear_model = LossPredictionModel(model_type="linear")
    linear_metrics = linear_model.train(loss_percentage_df, loss_tonnes_df)
    
    return {
        "random_forest": rf_metrics,
        "linear": linear_metrics
    }


if __name__ == "__main__":
    metrics = train_and_save_models()
    
    print("Model Training Results:")
    print("\nRandom Forest Model:")
    for metric, value in metrics["random_forest"].items():
        print(f"  - {metric}: {value:.4f}")
    
    print("\nLinear Model:")
    for metric, value in metrics["linear"].items():
        print(f"  - {metric}: {value:.4f}")
