"""Command-line interface for AgriPreserve."""

import argparse
import os
import sys
import multiprocessing
import time

def run_api(host="0.0.0.0", port=8001):
    """Run the FastAPI server."""
    from agripreserve.api.server import run_server
    run_server(host=host, port=port)

def run_ui(api_base_url="http://localhost:8000/api"):
    """Run the Gradio UI."""
    from agripreserve.ui.gradio_app import launch_ui
    launch_ui(api_base_url=api_base_url)

def run_both(api_host="0.0.0.0", api_port=8001):
    """Run both the API and UI."""
    api_process = multiprocessing.Process(
        target=run_api,
        args=(api_host, api_port)
    )
    api_process.start()
    
    # Wait for API to start
    print(f"Starting API server at http://{api_host}:{api_port}...")
    time.sleep(2)
    
    # Start UI
    api_base_url = f"http://localhost:{api_port}/api"
    print(f"Starting UI with API base URL: {api_base_url}")
    run_ui(api_base_url=api_base_url)
    
    # Clean up when UI exits
    api_process.terminate()
    api_process.join()

def main():
    """Main entry point for the CLI."""
    parser = argparse.ArgumentParser(description="AgriPreserve - Nigeria Post-Harvest Loss Analysis")
    
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # API command
    api_parser = subparsers.add_parser("api", help="Run the API server")
    api_parser.add_argument("--host", default="0.0.0.0", help="Host to bind to")
    api_parser.add_argument("--port", type=int, default=8001, help="Port to bind to")
    
    # UI command
    ui_parser = subparsers.add_parser("ui", help="Run the UI")
    ui_parser.add_argument("--api-url", default="http://localhost:8001/api", help="API base URL")
    
    # Both command
    both_parser = subparsers.add_parser("both", help="Run both API and UI")
    both_parser.add_argument("--host", default="0.0.0.0", help="Host for API to bind to")
    both_parser.add_argument("--port", type=int, default=8001, help="Port for API to bind to")
    
    args = parser.parse_args()
    
    if args.command == "api":
        run_api(host=args.host, port=args.port)
    elif args.command == "ui":
        run_ui(api_base_url=args.api_url)
    elif args.command == "both":
        run_both(api_host=args.host, api_port=args.port)
    else:
        # Default to running both if no command specified
        run_both()

if __name__ == "__main__":
    main()
