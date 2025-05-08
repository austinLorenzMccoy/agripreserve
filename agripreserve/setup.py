"""Setup script for AgriPreserve package."""

from setuptools import setup, find_packages

setup(
    name="agripreserve",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        # Web and API
        "fastapi>=0.100.0",
        "uvicorn>=0.23.0",
        "gradio>=3.50.0",
        "python-multipart>=0.0.6",
        "pydantic>=2.0.0",
        
        # Data analysis and visualization
        "pandas>=2.1.0",
        "numpy>=1.26.0",
        "matplotlib>=3.8.0",
        "seaborn>=0.13.0",
        "plotly>=5.18.0",
        
        # Machine learning
        "scikit-learn>=1.3.0",
        
        # HTTP and networking
        "requests>=2.31.0",
        
        # DVC and MLflow for tracking metrics and models
        "dvc>=3.0.0",
        "dvc-gdrive>=2.20.0",
        "mlflow>=2.10.0",
        "dagshub>=0.5.0",
        "python-dotenv>=0.19.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-cov>=4.0.0",
            "black>=23.0.0",
            "isort>=5.12.0",
        ],
    },
    entry_points={
        "console_scripts": [
            "agripreserve=agripreserve.cli:main",
        ],
    },
    author="AgriPreserve Team",
    author_email="info@agripreserve.org",
    description="A package for analyzing post-harvest losses in Nigeria with DVC and MLflow integration",
    keywords="agriculture, post-harvest, nigeria, data analysis, mlflow, dvc, dagshub",
    url="https://github.com/agripreserve/agripreserve",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Science/Research",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
    ],
    python_requires=">=3.8",
)
