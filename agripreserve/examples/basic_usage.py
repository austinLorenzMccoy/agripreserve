"""
Example usage of the AgriPreserve package.

This script demonstrates how to use the AgriPreserve package to:
1. Load and analyze post-harvest loss data
2. Generate visualizations
3. Get storage recommendations
4. Find market connections
"""

import pandas as pd
import matplotlib.pyplot as plt
import os
import sys

# Add the parent directory to the path to import the package
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agripreserve.data.loader import load_datasets
from agripreserve.ui.gradio_app import get_storage_recommendations, get_market_data, get_crop_price

def main():
    """Run example usage of AgriPreserve package."""
    print("AgriPreserve Example Usage")
    print("=========================\n")
    
    # 1. Load the datasets
    print("Loading datasets...")
    loss_percentage_df, loss_tonnes_df = load_datasets()
    
    # 2. Display basic information about the datasets
    print(f"\nLoss Percentage Dataset: {loss_percentage_df.shape[0]} rows, {loss_percentage_df.shape[1]} columns")
    print(f"Loss Tonnage Dataset: {loss_tonnes_df.shape[0]} rows, {loss_tonnes_df.shape[1]} columns")
    
    # 3. Show the first few rows of each dataset
    print("\nLoss Percentage Dataset (first 5 rows):")
    print(loss_percentage_df.head())
    
    print("\nLoss Tonnage Dataset (first 5 rows):")
    print(loss_tonnes_df.head())
    
    # 4. Calculate and display summary statistics
    print("\nSummary Statistics:")
    print("\nTotal Loss by Crop (tonnes):")
    total_losses = {
        "Maize": loss_tonnes_df["Maize"].sum(),
        "Rice": loss_tonnes_df["Rice"].sum(),
        "Sorghum": loss_tonnes_df["Sorghum"].sum(),
        "Millet": loss_tonnes_df["Millet"].sum()
    }
    
    for crop, loss in total_losses.items():
        print(f"  {crop}: {loss:,.2f} tonnes")
    
    print(f"\nTotal Food Loss: {sum(total_losses.values()):,.2f} tonnes")
    
    # 5. Calculate average loss percentages by crop
    print("\nAverage Loss Percentages by Crop:")
    avg_percentages = {
        "Maize": loss_percentage_df["Maize"].mean(),
        "Rice": loss_percentage_df["Rice"].mean(),
        "Sorghum": loss_percentage_df[loss_percentage_df["Sorghum"] > 0]["Sorghum"].mean(),
        "Millet": loss_percentage_df[loss_percentage_df["Millet"] > 0]["Millet"].mean()
    }
    
    for crop, percentage in avg_percentages.items():
        print(f"  {crop}: {percentage:.2f}%")
    
    # 6. Analyze losses by region
    print("\nLosses by Region (tonnes):")
    region_losses = loss_tonnes_df.groupby("Region")[["Maize", "Rice", "Sorghum", "Millet"]].sum()
    region_losses["Total"] = region_losses.sum(axis=1)
    print(region_losses)
    
    # 7. Find top 5 states with highest losses
    print("\nTop 5 States with Highest Total Losses:")
    loss_tonnes_df["Total"] = loss_tonnes_df[["Maize", "Rice", "Sorghum", "Millet"]].sum(axis=1)
    top_states = loss_tonnes_df.sort_values("Total", ascending=False).head(5)
    for i, (idx, row) in enumerate(top_states.iterrows(), 1):
        print(f"  {i}. {row['State']} ({row['Region']}): {row['Total']:,.2f} tonnes")
    
    # 8. Generate storage recommendations for a specific case
    print("\nStorage Recommendations Example:")
    crop = "Maize"
    state = "Kano"
    quantity = 50
    duration = 12
    
    print(f"Generating storage recommendations for {quantity} tonnes of {crop} in {state} for {duration} months...")
    
    # Get loss percentage for this state and crop
    loss_percentage = loss_percentage_df.loc[loss_percentage_df["State"] == state, crop].values[0]
    potential_loss_tonnes = quantity * loss_percentage / 100
    potential_loss_value = potential_loss_tonnes * get_crop_price(crop)
    
    print(f"Current post-harvest loss rate in {state}: {loss_percentage:.2f}%")
    print(f"Potential loss without intervention: {potential_loss_tonnes:.2f} tonnes (₦{potential_loss_value:,.2f})")
    
    recommendations = get_storage_recommendations(crop, state, duration)
    print(f"\nTop recommendation: {recommendations[0]['name']}")
    print(f"Description: {recommendations[0]['description']}")
    print(f"Cost: {recommendations[0]['cost']}")
    print(f"Expected loss reduction: {recommendations[0]['loss_reduction']}")
    
    # 9. Find market connections
    print("\nMarket Connections Example:")
    crop = "Rice"
    state = "Lagos"
    quantity = 30
    quality = "Premium"
    
    print(f"Finding market connections for {quantity} tonnes of {quality} {crop} in {state}...")
    
    markets = get_market_data(crop, state, quality)
    print(f"Found {len(markets)} potential buyers:")
    
    for i, market in enumerate(markets, 1):
        print(f"  {i}. {market['name']} ({market['location']})")
        print(f"     Price: ₦{market['price']:,.2f}/tonne")
        print(f"     Demand: {market['demand']} tonnes")
        print(f"     Potential value: ₦{market['price'] * min(quantity, market['demand']):,.2f}")
    
    print("\nExample completed successfully!")

if __name__ == "__main__":
    main()
