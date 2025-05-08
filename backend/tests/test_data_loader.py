"""Tests for the data loader module."""

import os
import pandas as pd
import pytest
from agripreserve.data.loader import load_datasets, assign_region

def test_assign_region():
    """Test the assign_region function."""
    # Test northern states
    assert assign_region("Kano") == "Northern"
    assert assign_region("Sokoto") == "Northern"
    
    # Test middle belt states
    assert assign_region("Plateau") == "Middle Belt"
    assert assign_region("Abuja Federal Capital Territory") == "Middle Belt"
    
    # Test southern states
    assert assign_region("Lagos") == "Southern"
    assert assign_region("Rivers") == "Southern"
    
    # Test unknown state
    assert assign_region("Unknown State") == "Unknown"

def test_load_datasets():
    """Test the load_datasets function."""
    # Load the datasets
    loss_percentage_df, loss_tonnes_df = load_datasets()
    
    # Check that the dataframes are not empty
    assert not loss_percentage_df.empty
    assert not loss_tonnes_df.empty
    
    # Check that the dataframes have the expected columns
    expected_columns = ["State", "Maize", "Rice", "Sorghum", "Millet", "Region"]
    assert all(col in loss_percentage_df.columns for col in expected_columns)
    assert all(col in loss_tonnes_df.columns for col in expected_columns)
    
    # Check that the Region column was added correctly
    assert "Region" in loss_percentage_df.columns
    assert "Region" in loss_tonnes_df.columns
    
    # Check that there are some values in each region
    regions = ["Northern", "Middle Belt", "Southern"]
    for region in regions:
        assert (loss_percentage_df["Region"] == region).any()
        assert (loss_tonnes_df["Region"] == region).any()
