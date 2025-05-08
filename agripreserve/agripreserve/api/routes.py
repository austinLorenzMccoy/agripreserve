"""API routes for AgriPreserve."""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional, Union
from fastapi.responses import JSONResponse
import pandas as pd

from agripreserve.data.loader import load_datasets

# Load the datasets
loss_percentage_df, loss_tonnes_df = load_datasets()

def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="AgriPreserve API",
        description="API for analyzing post-harvest losses in Nigeria",
        version="0.1.0"
    )

    # Enable CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    def read_root():
        return {"message": "Welcome to AgriPreserve API"}

    @app.get("/api/crops")
    def get_crops():
        """Get list of available crops"""
        crops = ["Maize", "Rice", "Sorghum", "Millet"]
        return {"crops": crops}

    @app.get("/api/states")
    def get_states():
        """Get list of states in Nigeria"""
        states = loss_percentage_df["State"].tolist()
        return {"states": states}

    @app.get("/api/regions")
    def get_regions():
        """Get list of regions in Nigeria"""
        regions = loss_percentage_df["Region"].unique().tolist()
        return {"regions": regions}

    @app.get("/api/loss-percentage")
    def get_loss_percentage(
        state: Optional[str] = Query(None, description="Filter by state"),
        crop: Optional[str] = Query(None, description="Filter by crop"),
        region: Optional[str] = Query(None, description="Filter by region")
    ):
        """Get post-harvest loss percentages"""
        filtered_df = loss_percentage_df.copy()
        
        if state:
            filtered_df = filtered_df[filtered_df["State"] == state]
        if region:
            filtered_df = filtered_df[filtered_df["Region"] == region]
        
        if crop:
            if crop not in ["Maize", "Rice", "Sorghum", "Millet"]:
                raise HTTPException(status_code=400, detail="Invalid crop name")
            
            result = filtered_df[["State", "Region", crop]].rename(columns={crop: "loss_percentage"})
            result = result[result["loss_percentage"] > 0]  # Filter out zero values
            return result.to_dict(orient="records")
        
        # If no crop is specified, return all crops
        return filtered_df.to_dict(orient="records")

    @app.get("/api/loss-tonnes")
    def get_loss_tonnes(
        state: Optional[str] = Query(None, description="Filter by state"),
        crop: Optional[str] = Query(None, description="Filter by crop"),
        region: Optional[str] = Query(None, description="Filter by region")
    ):
        """Get post-harvest loss in tonnes"""
        filtered_df = loss_tonnes_df.copy()
        
        if state:
            filtered_df = filtered_df[filtered_df["State"] == state]
        if region:
            filtered_df = filtered_df[filtered_df["Region"] == region]
        
        if crop:
            if crop not in ["Maize", "Rice", "Sorghum", "Millet"]:
                raise HTTPException(status_code=400, detail="Invalid crop name")
            
            result = filtered_df[["State", "Region", crop]].rename(columns={crop: "loss_tonnes"})
            result = result[result["loss_tonnes"] > 0]  # Filter out zero values
            return result.to_dict(orient="records")
        
        # If no crop is specified, return all crops
        return filtered_df.to_dict(orient="records")

    @app.get("/api/summary-statistics")
    def get_summary_statistics():
        """Get summary statistics for post-harvest losses"""
        # Calculate total losses by crop
        total_losses = {
            "Maize": loss_tonnes_df["Maize"].sum(),
            "Rice": loss_tonnes_df["Rice"].sum(),
            "Sorghum": loss_tonnes_df["Sorghum"].sum(),
            "Millet": loss_tonnes_df["Millet"].sum()
        }
        
        # Calculate average loss percentages by crop
        avg_percentages = {
            "Maize": loss_percentage_df["Maize"].mean(),
            "Rice": loss_percentage_df["Rice"].mean(),
            "Sorghum": loss_percentage_df[loss_percentage_df["Sorghum"] > 0]["Sorghum"].mean(),
            "Millet": loss_percentage_df[loss_percentage_df["Millet"] > 0]["Millet"].mean()
        }
        
        # Calculate top 3 states for each crop by loss tonnage
        top_states = {}
        crops = ["Maize", "Rice", "Sorghum", "Millet"]
        
        for crop in crops:
            top_crop_states = loss_tonnes_df.sort_values(crop, ascending=False).head(3)
            top_states[crop] = [
                {"state": state, "loss_tonnes": loss} 
                for state, loss in zip(top_crop_states["State"], top_crop_states[crop])
            ]
        
        # Calculate region statistics
        region_stats = []
        regions = loss_tonnes_df["Region"].unique()
        
        for region in regions:
            region_df = loss_tonnes_df[loss_tonnes_df["Region"] == region]
            total_region_loss = {
                "Maize": region_df["Maize"].sum(),
                "Rice": region_df["Rice"].sum(),
                "Sorghum": region_df["Sorghum"].sum(),
                "Millet": region_df["Millet"].sum()
            }
            region_stats.append({
                "region": region,
                "losses": total_region_loss,
                "total_loss": sum(total_region_loss.values())
            })
        
        return {
            "total_losses": total_losses,
            "total_food_loss": sum(total_losses.values()),
            "average_loss_percentages": avg_percentages,
            "top_states_by_crop": top_states,
            "region_statistics": region_stats
        }

    @app.get("/api/high-opportunity-areas")
    def get_high_opportunity_areas(limit: int = 10):
        """Get high-opportunity areas for intervention based on loss tonnage"""
        # Melt the dataframe to have crops as rows
        melted_df = pd.melt(
            loss_tonnes_df, 
            id_vars=["State", "Region"], 
            value_vars=["Maize", "Rice", "Sorghum", "Millet"],
            var_name="Crop", 
            value_name="Loss_Tonnes"
        )
        
        # Filter out zero values
        melted_df = melted_df[melted_df["Loss_Tonnes"] > 0]
        
        # Sort by loss tonnage
        melted_df = melted_df.sort_values("Loss_Tonnes", ascending=False)
        
        # Get top opportunities
        top_opportunities = melted_df.head(limit)
        
        # Add loss percentage data
        result = []
        for _, row in top_opportunities.iterrows():
            state = row["State"]
            crop = row["Crop"]
            
            # Get loss percentage for this state and crop
            loss_percentage = loss_percentage_df.loc[
                loss_percentage_df["State"] == state, crop
            ].values[0]
            
            result.append({
                "state": state,
                "region": row["Region"],
                "crop": crop,
                "loss_tonnes": row["Loss_Tonnes"],
                "loss_percentage": loss_percentage
            })
        
        return result

    @app.get("/api/crop-comparison")
    def get_crop_comparison():
        """Compare crops by loss percentage and tonnage"""
        # Calculate total losses by crop
        total_losses = {
            "Maize": loss_tonnes_df["Maize"].sum(),
            "Rice": loss_tonnes_df["Rice"].sum(),
            "Sorghum": loss_tonnes_df["Sorghum"].sum(),
            "Millet": loss_tonnes_df["Millet"].sum()
        }
        
        # Calculate average loss percentages by crop
        avg_percentages = {
            "Maize": loss_percentage_df["Maize"].mean(),
            "Rice": loss_percentage_df["Rice"].mean(),
            "Sorghum": loss_percentage_df[loss_percentage_df["Sorghum"] > 0]["Sorghum"].mean(),
            "Millet": loss_percentage_df[loss_percentage_df["Millet"] > 0]["Millet"].mean()
        }
        
        # Combine into a single result
        result = []
        for crop in ["Maize", "Rice", "Sorghum", "Millet"]:
            result.append({
                "crop": crop,
                "total_loss_tonnes": total_losses[crop],
                "average_loss_percentage": avg_percentages[crop]
            })
        
        return result

    return app
