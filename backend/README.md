# AgriPreserve

A comprehensive platform for analyzing post-harvest losses in Nigeria, featuring a React frontend and Python backend.

## Overview

AgriPreserve provides tools for analyzing and visualizing post-harvest losses across different crops and regions in Nigeria. It also offers recommendations for storage solutions and market connections to reduce losses and improve farmer income.

## Features

### Backend
- **Data Analysis**: Analyze post-harvest losses by crop, state, and region
- **Visualization**: Generate interactive visualizations of loss data
- **Summary Statistics**: Get comprehensive statistics on post-harvest losses
- **High-Opportunity Areas**: Identify areas with the highest potential for intervention
- **Storage Recommendations**: Get smart storage recommendations based on crop, location, and duration
- **Market Connections**: Find potential market connections for your crops
- **ML Models**: Predictive models for crop loss estimation and optimization

### Frontend
- **Modern React UI**: Responsive and intuitive user interface built with React and TypeScript
- **Interactive Dashboard**: Visual representation of key metrics and insights
- **Reusable Components**: Button, Card, Badge, Alert, Modal, ProgressBar, BarChart, Stat, etc.
- **Dashboard Widgets**: CropLossStats, LossFactorsWidget, LossTrendWidget, StorageUnitsWidget, MarketOpportunitiesWidget
- **API Services**: Comprehensive API client with services for crop loss data, storage solutions, market connections, and ML models
- **Custom Hooks**: React Query hooks for efficient data fetching and state management
- **Utility Functions**: Formatters, localStorage handlers, validation, and data transformation utilities

## Installation

### Backend

#### From Source

Clone the repository and install the package:

```bash
git clone https://github.com/agripreserve/agripreserve.git
cd agripreserve
pip install -e .
```

#### Using pip

```bash
pip install agripreserve
```

### Frontend

```bash
cd frontend
npm install
```

## Usage

### Running the Backend

#### Command Line Interface

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

#### Python API

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

### Running the Frontend

```bash
cd frontend

# Development mode
npm run dev

# Production build
npm run build

# Serve production build
npm run serve
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
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── apiClient.ts
│   │   │   ├── cropLossService.ts
│   │   │   ├── storageService.ts
│   │   │   ├── marketService.ts
│   │   │   └── mlModelService.ts
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Alert.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── BarChart.tsx
│   │   │   │   └── Stat.tsx
│   │   │   ├── widgets/
│   │   │   │   ├── CropLossStats.tsx
│   │   │   │   ├── LossFactorsWidget.tsx
│   │   │   │   ├── LossTrendWidget.tsx
│   │   │   │   ├── StorageUnitsWidget.tsx
│   │   │   │   └── MarketOpportunitiesWidget.tsx
│   │   │   └── layout/
│   │   │       ├── Sidebar.tsx
│   │   │       ├── Navbar.tsx
│   │   │       └── Footer.tsx
│   │   ├── hooks/
│   │   │   ├── useCropLoss.ts
│   │   │   ├── useStorage.ts
│   │   │   ├── useMarket.ts
│   │   │   └── useMLModels.ts
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CropLoss.tsx
│   │   │   ├── Storage.tsx
│   │   │   ├── Market.tsx
│   │   │   └── MLModels.tsx
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── storage.ts
│   │   │   ├── validation.ts
│   │   │   ├── dataTransform.ts
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── setup.py
├── pyproject.toml
├── requirements.txt
└── README.md
```

## Data Sources

The platform uses data from the African Postharvest Losses Information System (APHLIS) for Nigeria, covering the following crops:

- Maize
- Rice
- Sorghum
- Millet

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Testing

### Backend Testing

The project includes a comprehensive test suite using pytest. To run the tests:

```bash
# Install development dependencies
pip install -e ".[dev]"

# Run the tests
python -m pytest

# Run tests with coverage report
python -m pytest --cov=agripreserve --cov-report=term-missing
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## API Examples

### REST API

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

### Frontend API Services

The frontend includes TypeScript services for interacting with the API:

```typescript
// Crop Loss Service
import { cropLossService } from './api/cropLossService';

// Get overall stats
const stats = await cropLossService.getOverallStats();

// Get crop loss data for a specific crop
const lossData = await cropLossService.getCropLossData('Maize');

// Get loss trends over time
const trends = await cropLossService.getLossTrends('Maize', 'Lagos');

// Get recommendations
const recommendations = await cropLossService.getRecommendations('Maize');
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
