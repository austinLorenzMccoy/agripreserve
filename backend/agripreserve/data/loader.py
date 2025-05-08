"""Data loading module for AgriPreserve."""

import pandas as pd
import os
from typing import Tuple, Optional

# Define regions
NORTHERN_STATES = ["Sokoto", "Kebbi", "Zamfara", "Katsina", "Kano", "Jigawa", "Yobe", "Borno"]
MIDDLE_BELT_STATES = ["Niger", "Kwara", "Kogi", "Benue", "Plateau", "Nasarawa", "Taraba", "Adamawa", "Bauchi", "Gombe",
                      "Abuja Federal Capital Territory"]
SOUTHERN_STATES = ["Lagos", "Ogun", "Oyo", "Osun", "Ondo", "Ekiti", "Edo", "Delta", "Bayelsa", "Rivers", 
                   "Imo", "Abia", "Anambra", "Ebonyi", "Enugu", "Cross River", "Akwa Ibom"]

def assign_region(state: str) -> str:
    """Assign a region to a state."""
    if state in NORTHERN_STATES:
        return "Northern"
    elif state in MIDDLE_BELT_STATES:
        return "Middle Belt"
    elif state in SOUTHERN_STATES:
        return "Southern"
    else:
        return "Unknown"

def load_datasets(data_dir: Optional[str] = None) -> Tuple[pd.DataFrame, pd.DataFrame]:
    """
    Load the datasets for post-harvest losses.
    
    Args:
        data_dir: Directory containing the data files. If None, uses the package's datasets directory.
        
    Returns:
        Tuple of (loss_percentage_df, loss_tonnes_df)
    """
    if data_dir is None:
        # Use the package's datasets directory
        data_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "datasets")
    
    try:
        # Load the datasets
        loss_percentage_df = pd.read_csv(os.path.join(data_dir, 
            "aphlis-data-en-v2.19.3-nigeria-all-provinces-all-crops-2022-dry-weight-losses_in _percentage.csv"))
        loss_tonnes_df = pd.read_csv(os.path.join(data_dir, 
            "aphlis-data-en-v2.19.3-nigeria-all-provinces-all-crops-2022-dry-weight-losses_in_tonnes.csv"))
        
        # Add region classification to the dataframes
        loss_percentage_df["Region"] = loss_percentage_df["State"].apply(assign_region)
        loss_tonnes_df["Region"] = loss_tonnes_df["State"].apply(assign_region)
        
        return loss_percentage_df, loss_tonnes_df
    
    except Exception as e:
        print(f"Error loading datasets: {e}")
        # Create empty dataframes if files are not found
        loss_percentage_df = pd.DataFrame(columns=["State", "Maize", "Rice", "Sorghum", "Millet", "Region"])
        loss_tonnes_df = pd.DataFrame(columns=["State", "Maize", "Rice", "Sorghum", "Millet", "Region"])
        return loss_percentage_df, loss_tonnes_df
