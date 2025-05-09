"""Render deployment script for AgriPreserve backend."""

import os
from agripreserve.api.server import run_server

if __name__ == "__main__":
    # Get port from environment variable or use default
    port = int(os.environ.get("PORT", 10000))
    
    # Configure allowed origins for CORS
    allowed_origins = [
        "https://agripreserve-frontend.onrender.com",  # Production frontend
        "http://localhost:3000",                       # Local development frontend
        "http://localhost:4173"                        # Local preview frontend
    ]
    
    # Run the server with production settings
    run_server(host="0.0.0.0", port=port, allowed_origins=allowed_origins)
