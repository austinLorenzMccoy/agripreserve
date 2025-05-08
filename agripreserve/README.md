# AgriPreserve

A Python package for analyzing post-harvest losses in Nigeria.

## Overview

AgriPreserve provides tools for analyzing and visualizing post-harvest losses across different crops and regions in Nigeria. It also offers recommendations for storage solutions and market connections to reduce losses and improve farmer income.

## Features

- **Data Analysis**: Analyze post-harvest losses by crop, state, and region
- **Visualization**: Generate interactive visualizations of loss data
- **Summary Statistics**: Get comprehensive statistics on post-harvest losses
- **High-Opportunity Areas**: Identify areas with the highest potential for intervention
- **Storage Recommendations**: Get smart storage recommendations based on crop, location, and duration
- **Market Connections**: Find potential market connections for your crops

## Installation

### From Source

Clone the repository and install the package:

```bash
git clone https://github.com/agripreserve/agripreserve.git
cd agripreserve
pip install -e .
```

### Using pip

```bash
pip install agripreserve
```

## Usage

### Command Line Interface

AgriPreserve provides a command-line interface for running the application:

```bash
# Run both API and UI
agripreserve

# Run only the API
agripreserve api --host 0.0.0.0 --port 8000

# Run only the UI
agripreserve ui --api-url http://localhost:8000/api

# Run both with custom settings
agripreserve both --host 0.0.0.0 --port 8000
```

### Python API

You can also use AgriPreserve as a Python package:

```python
# Run the API
from agripreserve.api.server import run_server
run_server(host="0.0.0.0", port=8000)

# Run the UI
from agripreserve.ui.gradio_app import launch_ui
launch_ui(api_base_url="http://localhost:8000/api")

# Load and process data
from agripreserve.data.loader import load_datasets
loss_percentage_df, loss_tonnes_df = load_datasets()
```

## Project Structure

```
agripreserve/
├── agripreserve/
│   ├── __init__.py
│   ├── __main__.py
│   ├── cli.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── server.py
│   ├── data/
│   │   ├── __init__.py
│   │   └── loader.py
│   ├── models/
│   │   └── __init__.py
│   ├── ui/
│   │   ├── __init__.py
│   │   └── gradio_app.py
│   └── utils/
│       └── __init__.py
├── setup.py
├── pyproject.toml
└── README.md
```

## Data Sources

The package uses data from the African Postharvest Losses Information System (APHLIS) for Nigeria, covering the following crops:

- Maize
- Rice
- Sorghum
- Millet

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Testing

The project includes a comprehensive test suite using pytest. To run the tests:

```bash
# Install development dependencies
pip install -e ".[dev]"

# Run the tests
python -m pytest

# Run tests with coverage report
python -m pytest --cov=agripreserve --cov-report=term-missing
```

## API Examples

Here are some examples of using the API with curl:

```bash
# Get available crops
curl http://localhost:8000/api/crops

# Get states in Nigeria
curl http://localhost:8000/api/states

# Get post-harvest loss percentages for Maize
curl http://localhost:8000/api/loss-percentage?crop=Maize

# Get post-harvest losses in tonnes for Rice in Lagos
curl http://localhost:8000/api/loss-tonnes?crop=Rice&state=Lagos

# Get summary statistics
curl http://localhost:8000/api/summary-statistics

# Get high-opportunity areas (limited to top 5)
curl http://localhost:8000/api/high-opportunity-areas?limit=5

# Get crop comparison data
curl http://localhost:8000/api/crop-comparison
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
