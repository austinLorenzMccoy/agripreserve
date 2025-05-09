"""Server module for running the AgriPreserve API."""

import uvicorn
from agripreserve.api.routes import create_app
from typing import List, Optional

def run_server(host: str = "0.0.0.0", port: int = 8000, allowed_origins: Optional[List[str]] = None):
    """Run the FastAPI server."""
    app = create_app(allowed_origins=allowed_origins)
    uvicorn.run(app, host=host, port=port)

if __name__ == "__main__":
    run_server()
