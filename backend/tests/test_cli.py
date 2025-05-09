"""Tests for the CLI module."""

import pytest
from unittest.mock import patch, MagicMock
from agripreserve.cli import main, run_api

def test_cli_imports():
    """Test that the CLI module imports correctly."""
    # This test just ensures that the imports work
    assert callable(main)
    assert callable(run_api)

@patch('agripreserve.cli.run_api')
def test_main_api(mock_run_api):
    """Test the main function with API arguments."""
    with patch('sys.argv', ['agripreserve', '--host', '127.0.0.1', '--port', '8080', '--allow-origins', 'http://localhost:3000']):
        main()
        mock_run_api.assert_called_once_with(host='127.0.0.1', port=8080, allow_origins='http://localhost:3000')

@patch('agripreserve.cli.run_api')
def test_main_default(mock_run_api):
    """Test the main function with default arguments."""
    with patch('sys.argv', ['agripreserve']):
        main()
        mock_run_api.assert_called_once_with(
            host='0.0.0.0', 
            port=8001, 
            allow_origins='http://localhost:3000,http://localhost:5173'
        )
