"""Tests for the CLI module."""

import pytest
from unittest.mock import patch, MagicMock
from agripreserve.cli import main, run_api, run_ui, run_both

def test_cli_imports():
    """Test that the CLI module imports correctly."""
    # This test just ensures that the imports work
    assert callable(main)
    assert callable(run_api)
    assert callable(run_ui)
    assert callable(run_both)

@patch('agripreserve.cli.run_api')
def test_main_api(mock_run_api):
    """Test the main function with the api command."""
    with patch('sys.argv', ['agripreserve', 'api', '--host', '127.0.0.1', '--port', '8080']):
        main()
        mock_run_api.assert_called_once_with(host='127.0.0.1', port=8080)

@patch('agripreserve.cli.run_ui')
def test_main_ui(mock_run_ui):
    """Test the main function with the ui command."""
    with patch('sys.argv', ['agripreserve', 'ui', '--api-url', 'http://example.com/api']):
        main()
        mock_run_ui.assert_called_once_with(api_base_url='http://example.com/api')

@patch('agripreserve.cli.run_both')
def test_main_both(mock_run_both):
    """Test the main function with the both command."""
    with patch('sys.argv', ['agripreserve', 'both', '--host', '127.0.0.1', '--port', '8080']):
        main()
        mock_run_both.assert_called_once_with(api_host='127.0.0.1', api_port=8080)

@patch('agripreserve.cli.run_both')
def test_main_default(mock_run_both):
    """Test the main function with no command (should default to both)."""
    with patch('sys.argv', ['agripreserve']):
        main()
        mock_run_both.assert_called_once_with()
