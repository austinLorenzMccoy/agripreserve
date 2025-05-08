"""Tests for the API routes."""

import pytest
from fastapi.testclient import TestClient
from agripreserve.api.routes import create_app

@pytest.fixture
def client():
    """Create a test client for the API."""
    app = create_app()
    return TestClient(app)

def test_read_root(client):
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to AgriPreserve API"}

def test_get_crops(client):
    """Test the crops endpoint."""
    response = client.get("/api/crops")
    assert response.status_code == 200
    data = response.json()
    assert "crops" in data
    assert isinstance(data["crops"], list)
    assert len(data["crops"]) == 4
    assert all(crop in data["crops"] for crop in ["Maize", "Rice", "Sorghum", "Millet"])

def test_get_states(client):
    """Test the states endpoint."""
    response = client.get("/api/states")
    assert response.status_code == 200
    data = response.json()
    assert "states" in data
    assert isinstance(data["states"], list)
    assert len(data["states"]) > 0

def test_get_regions(client):
    """Test the regions endpoint."""
    response = client.get("/api/regions")
    assert response.status_code == 200
    data = response.json()
    assert "regions" in data
    assert isinstance(data["regions"], list)
    assert len(data["regions"]) > 0
    assert all(region in data["regions"] for region in ["Northern", "Middle Belt", "Southern"])

def test_get_loss_percentage(client):
    """Test the loss-percentage endpoint."""
    # Test without filters
    response = client.get("/api/loss-percentage")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    
    # Test with state filter
    response = client.get("/api/loss-percentage?state=Lagos")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert all(item["State"] == "Lagos" for item in data)
    
    # Test with crop filter
    response = client.get("/api/loss-percentage?crop=Maize")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert all("loss_percentage" in item for item in data)
    
    # Test with region filter
    response = client.get("/api/loss-percentage?region=Northern")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert all(item["Region"] == "Northern" for item in data)

def test_get_loss_tonnes(client):
    """Test the loss-tonnes endpoint."""
    # Test without filters
    response = client.get("/api/loss-tonnes")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    
    # Test with state filter
    response = client.get("/api/loss-tonnes?state=Lagos")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert all(item["State"] == "Lagos" for item in data)
    
    # Test with crop filter
    response = client.get("/api/loss-tonnes?crop=Maize")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert all("loss_tonnes" in item for item in data)
    
    # Test with region filter
    response = client.get("/api/loss-tonnes?region=Northern")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert all(item["Region"] == "Northern" for item in data)

def test_get_summary_statistics(client):
    """Test the summary-statistics endpoint."""
    response = client.get("/api/summary-statistics")
    assert response.status_code == 200
    data = response.json()
    
    # Check that the response has the expected keys
    expected_keys = ["total_losses", "total_food_loss", "average_loss_percentages", 
                     "top_states_by_crop", "region_statistics"]
    assert all(key in data for key in expected_keys)
    
    # Check that total_losses has the expected crops
    assert all(crop in data["total_losses"] for crop in ["Maize", "Rice", "Sorghum", "Millet"])
    
    # Check that total_food_loss is a number
    assert isinstance(data["total_food_loss"], (int, float))
    
    # Check that average_loss_percentages has the expected crops
    assert all(crop in data["average_loss_percentages"] for crop in ["Maize", "Rice", "Sorghum", "Millet"])
    
    # Check that top_states_by_crop has the expected crops
    assert all(crop in data["top_states_by_crop"] for crop in ["Maize", "Rice", "Sorghum", "Millet"])
    
    # Check that region_statistics is a list
    assert isinstance(data["region_statistics"], list)
    assert len(data["region_statistics"]) > 0

def test_get_high_opportunity_areas(client):
    """Test the high-opportunity-areas endpoint."""
    response = client.get("/api/high-opportunity-areas")
    assert response.status_code == 200
    data = response.json()
    
    # Check that the response is a list
    assert isinstance(data, list)
    assert len(data) > 0
    
    # Check that each item has the expected keys
    expected_keys = ["state", "region", "crop", "loss_tonnes", "loss_percentage"]
    if len(data) > 0:
        assert all(key in data[0] for key in expected_keys)
    
    # Test with limit parameter
    response = client.get("/api/high-opportunity-areas?limit=5")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) <= 5

def test_get_crop_comparison(client):
    """Test the crop-comparison endpoint."""
    response = client.get("/api/crop-comparison")
    assert response.status_code == 200
    data = response.json()
    
    # Check that the response is a list
    assert isinstance(data, list)
    assert len(data) == 4  # Four crops
    
    # Check that each item has the expected keys
    expected_keys = ["crop", "total_loss_tonnes", "average_loss_percentage"]
    assert all(all(key in item for key in expected_keys) for item in data)
    
    # Check that all crops are included
    crops = [item["crop"] for item in data]
    assert all(crop in crops for crop in ["Maize", "Rice", "Sorghum", "Millet"])
