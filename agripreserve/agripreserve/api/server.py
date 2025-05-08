"""Server module for running the AgriPreserve API."""

import uvicorn
from agripreserve.api.routes import create_app

app = create_app()

def run_server(host: str = "0.0.0.0", port: int = 8000):
    """Run the FastAPI server."""
    uvicorn.run(app, host=host, port=port)

if __name__ == "__main__":
    run_server()
