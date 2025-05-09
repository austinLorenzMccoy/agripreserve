"""Command-line interface for AgriPreserve."""

import argparse
import os
import sys

def run_api(host="0.0.0.0", port=8001, allow_origins=None):
    """Run the FastAPI server."""
    from agripreserve.api.server import run_server
    
    # Parse allowed origins for CORS
    origins = None
    if allow_origins:
        origins = [origin.strip() for origin in allow_origins.split(",")]
    
    run_server(host=host, port=port, allowed_origins=origins)

def main():
    """Main entry point for the CLI."""
    parser = argparse.ArgumentParser(description="AgriPreserve - Nigeria Post-Harvest Loss Analysis")
    
    # API command is now the default and only command
    parser.add_argument("--host", default="0.0.0.0", help="Host to bind to")
    parser.add_argument("--port", type=int, default=8001, help="Port to bind to")
    parser.add_argument("--allow-origins", default="http://localhost:3000,http://localhost:5173", 
                       help="Comma-separated list of allowed origins for CORS")
    
    args = parser.parse_args()
    
    # Run the API server
    run_api(host=args.host, port=args.port, allow_origins=args.allow_origins)

if __name__ == "__main__":
    main()
