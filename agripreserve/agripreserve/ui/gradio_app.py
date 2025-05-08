"""Gradio UI for AgriPreserve."""

import gradio as gr
import pandas as pd
import numpy as np
import requests
import json
import plotly.express as px
import plotly.graph_objects as go
from typing import List, Dict, Any, Tuple, Optional, Union

# Default API base URL - can be overridden
DEFAULT_API_BASE_URL = "http://localhost:8001/api"

class AgriPreserveUI:
    """Gradio UI for AgriPreserve."""
    
    def __init__(self, api_base_url: str = DEFAULT_API_BASE_URL):
        """Initialize the UI with API base URL."""
        self.api_base_url = api_base_url
    
    def fetch_data(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Fetch data from the API."""
        url = f"{self.api_base_url}/{endpoint}"
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching data from {url}: {e}")
            return None
    
    def get_states(self) -> List[str]:
        """Get list of states."""
        data = self.fetch_data("states")
        if data:
            return ["All States"] + data["states"]
        return ["All States"]
    
    def get_crops(self) -> List[str]:
        """Get list of crops."""
        data = self.fetch_data("crops")
        if data:
            return ["All Crops"] + data["crops"]
        return ["All Crops"]
    
    def get_regions(self) -> List[str]:
        """Get list of regions."""
        data = self.fetch_data("regions")
        if data:
            return ["All Regions"] + data["regions"]
        return ["All Regions"]
    
    def plot_loss_percentage(self, state=None, crop=None, region=None):
        """Generate plot for loss percentage."""
        params = {}
        if state and state != "All States":
            params["state"] = state
        if crop and crop != "All Crops":
            params["crop"] = crop
        if region and region != "All Regions":
            params["region"] = region
        
        data = self.fetch_data("loss-percentage", params)
        
        if not data:
            return "No data available", None
        
        if crop and crop != "All Crops":
            # Single crop was selected, show bar chart of states
            df = pd.DataFrame(data)
            if df.empty:
                return "No data available for the selected filters", None
            
            # Sort by loss percentage
            df = df.sort_values("loss_percentage", ascending=False)
            
            fig = px.bar(
                df, 
                x="State", 
                y="loss_percentage",
                color="Region",
                title=f"Post-Harvest Loss Percentage for {crop}",
                labels={"loss_percentage": "Loss Percentage (%)", "State": "State"},
                height=600
            )
            
            return fig, df.to_csv(index=False)
        else:
            # Multiple crops shown, need to reshape data
            df = pd.DataFrame(data)
            if df.empty:
                return "No data available for the selected filters", None
            
            if state and state != "All States":
                # For a single state, show all crops
                melted_df = pd.melt(
                    df, 
                    id_vars=["State", "Region"], 
                    value_vars=["Maize", "Rice", "Sorghum", "Millet"],
                    var_name="Crop", 
                    value_name="Loss_Percentage"
                )
                melted_df = melted_df[melted_df["Loss_Percentage"] > 0]
                
                fig = px.bar(
                    melted_df,
                    x="Crop",
                    y="Loss_Percentage",
                    color="Crop",
                    title=f"Post-Harvest Loss Percentages in {state}",
                    labels={"Loss_Percentage": "Loss Percentage (%)", "Crop": "Crop"},
                    height=600
                )
            else:
                # Show average loss by crop and region
                result_df = df.groupby("Region")[["Maize", "Rice", "Sorghum", "Millet"]].mean().reset_index()
                melted_df = pd.melt(
                    result_df, 
                    id_vars=["Region"], 
                    var_name="Crop", 
                    value_name="Average_Loss_Percentage"
                )
                melted_df = melted_df[melted_df["Average_Loss_Percentage"] > 0]
                
                fig = px.bar(
                    melted_df,
                    x="Region",
                    y="Average_Loss_Percentage",
                    color="Crop",
                    barmode="group",
                    title="Average Post-Harvest Loss Percentages by Region",
                    labels={"Average_Loss_Percentage": "Average Loss Percentage (%)", "Region": "Region"},
                    height=600
                )
            
            return fig, df.to_csv(index=False)
    
    def plot_loss_tonnes(self, state=None, crop=None, region=None):
        """Generate plot for loss in tonnes."""
        params = {}
        if state and state != "All States":
            params["state"] = state
        if crop and crop != "All Crops":
            params["crop"] = crop
        if region and region != "All Regions":
            params["region"] = region
        
        data = self.fetch_data("loss-tonnes", params)
        
        if not data:
            return "No data available", None
        
        if crop and crop != "All Crops":
            # Single crop was selected, show bar chart of states
            df = pd.DataFrame(data)
            if df.empty:
                return "No data available for the selected filters", None
            
            # Sort by loss tonnes
            df = df.sort_values("loss_tonnes", ascending=False)
            
            fig = px.bar(
                df, 
                x="State", 
                y="loss_tonnes",
                color="Region",
                title=f"Post-Harvest Losses in Tonnes for {crop}",
                labels={"loss_tonnes": "Loss (Tonnes)", "State": "State"},
                height=600
            )
            
            return fig, df.to_csv(index=False)
        else:
            # Multiple crops shown, need to reshape data
            df = pd.DataFrame(data)
            if df.empty:
                return "No data available for the selected filters", None
            
            if state and state != "All States":
                # For a single state, show all crops
                melted_df = pd.melt(
                    df, 
                    id_vars=["State", "Region"], 
                    value_vars=["Maize", "Rice", "Sorghum", "Millet"],
                    var_name="Crop", 
                    value_name="Loss_Tonnes"
                )
                melted_df = melted_df[melted_df["Loss_Tonnes"] > 0]
                
                fig = px.bar(
                    melted_df,
                    x="Crop",
                    y="Loss_Tonnes",
                    color="Crop",
                    title=f"Post-Harvest Losses in Tonnes in {state}",
                    labels={"Loss_Tonnes": "Loss (Tonnes)", "Crop": "Crop"},
                    height=600
                )
            else:
                # Show total loss by crop and region
                result_df = df.groupby("Region")[["Maize", "Rice", "Sorghum", "Millet"]].sum().reset_index()
                melted_df = pd.melt(
                    result_df, 
                    id_vars=["Region"], 
                    var_name="Crop", 
                    value_name="Total_Loss_Tonnes"
                )
                
                fig = px.bar(
                    melted_df,
                    x="Region",
                    y="Total_Loss_Tonnes",
                    color="Crop",
                    barmode="group",
                    title="Total Post-Harvest Losses in Tonnes by Region",
                    labels={"Total_Loss_Tonnes": "Loss (Tonnes)", "Region": "Region"},
                    height=600
                )
            
            return fig, df.to_csv(index=False)
    
    def get_summary_statistics(self):
        """Get and display summary statistics."""
        data = self.fetch_data("summary-statistics")
        
        if not data:
            return "Error fetching summary statistics"
        
        # Format the output as a report
        report = f"""
        # Summary Statistics for Post-Harvest Losses in Nigeria
        
        ## Total Food Loss
        Total food loss across all crops: **{data['total_food_loss']:,.2f} tonnes**
        
        ## Loss by Crop
        | Crop | Total Loss (tonnes) | Average Loss (%) |
        |------|---------------------|------------------|
        """
        
        for crop in ["Maize", "Rice", "Sorghum", "Millet"]:
            report += f"| {crop} | {data['total_losses'][crop]:,.2f} | {data['average_loss_percentages'][crop]:.2f} |\n"
        
        report += """
        ## Top 3 States by Crop Loss
        """
        
        for crop, states in data["top_states_by_crop"].items():
            report += f"\n### {crop}\n"
            for i, state_data in enumerate(states, 1):
                report += f"{i}. **{state_data['state']}**: {state_data['loss_tonnes']:,.2f} tonnes\n"
        
        report += """
        ## Regional Statistics
        | Region | Total Loss (tonnes) |
        |--------|---------------------|
        """
        
        for region in data["region_statistics"]:
            report += f"| {region['region']} | {region['total_loss']:,.2f} |\n"
        
        return report
    
    def get_high_opportunity_areas(self, limit=10):
        """Get high-opportunity areas for intervention."""
        data = self.fetch_data("high-opportunity-areas", {"limit": limit})
        
        if not data:
            return "Error fetching high-opportunity areas"
        
        # Format the output as a report
        report = f"""
        # High-Opportunity Areas for Post-Harvest Loss Reduction
        
        The following areas represent the highest post-harvest losses in Nigeria and offer the greatest opportunity for intervention:
        
        | Rank | State | Region | Crop | Loss (tonnes) | Loss (%) |
        |------|-------|--------|------|---------------|----------|
        """
        
        for i, item in enumerate(data, 1):
            report += f"| {i} | {item['state']} | {item['region']} | {item['crop']} | {item['loss_tonnes']:,.2f} | {item['loss_percentage']:.2f} |\n"
        
        return report
    
    def crop_comparison(self):
        """Compare crops by various metrics."""
        data = self.fetch_data("crop-comparison")
        
        if not data:
            return "Error fetching crop comparison data"
        
        # Convert to DataFrame for easier manipulation
        df = pd.DataFrame(data)
        
        # Create bar chart for total loss in tonnes
        fig1 = px.bar(
            df,
            x="crop",
            y="total_loss_tonnes",
            color="crop",
            title="Total Post-Harvest Loss by Crop (Tonnes)",
            labels={"total_loss_tonnes": "Total Loss (Tonnes)", "crop": "Crop"},
            height=400
        )
        
        # Create bar chart for average loss percentage
        fig2 = px.bar(
            df,
            x="crop",
            y="average_loss_percentage",
            color="crop",
            title="Average Post-Harvest Loss Percentage by Crop",
            labels={"average_loss_percentage": "Average Loss (%)", "crop": "Crop"},
            height=400
        )
        
        # Format the output as a report with charts
        report = f"""
        # Crop Comparison: Post-Harvest Losses
        
        ## Total Loss by Crop (Tonnes)
        """
        
        # Return the report with embedded plotly figures
        return gr.Plot(fig1), gr.Plot(fig2), df.to_csv(index=False)
    
    def generate_storage_recommendations(self, crop, state, quantity, duration):
        """Generate smart storage recommendations based on inputs."""
        if not crop or not state or not quantity or not duration:
            return "Please fill in all fields to get recommendations."
        
        try:
            quantity = float(quantity)
            duration = int(duration)
        except ValueError:
            return "Quantity must be a number and duration must be an integer."
        
        # Get loss percentage for this state and crop
        params = {"state": state, "crop": crop}
        data = self.fetch_data("loss-percentage", params)
        
        if not data or len(data) == 0:
            return f"No data available for {crop} in {state}."
        
        loss_percentage = data[0]["loss_percentage"]
        
        # Calculate potential loss without intervention
        potential_loss_tonnes = quantity * loss_percentage / 100
        potential_loss_value = potential_loss_tonnes * get_crop_price(crop)
        
        # Generate recommendations based on crop, climate, and duration
        storage_methods = get_storage_recommendations(crop, state, duration)
        
        # Format the output as a report
        report = f"""
        # Storage Recommendations for {crop} in {state}
        
        ## Current Situation
        - Quantity: **{quantity:,.2f} tonnes**
        - Expected storage duration: **{duration} months**
        - Average post-harvest loss rate in {state}: **{loss_percentage:.2f}%**
        - Potential loss without intervention: **{potential_loss_tonnes:.2f} tonnes** (estimated value: ₦{potential_loss_value:,.2f})
        
        ## Recommended Storage Solutions
        """
        
        for i, method in enumerate(storage_methods, 1):
            report += f"""
            ### {i}. {method['name']}
            
            {method['description']}
            
            - **Estimated cost:** {method['cost']}
            - **Expected loss reduction:** {method['loss_reduction']}
            - **Suitable for duration:** {method['duration_suitability']}
            - **Implementation complexity:** {method['complexity']}
            """
        
        report += """
        ## Implementation Steps
        
        1. **Assessment**: Evaluate current storage facilities and practices
        2. **Selection**: Choose the most appropriate solution based on budget and requirements
        3. **Implementation**: Set up the selected storage solution
        4. **Monitoring**: Regularly check crop condition and storage environment
        5. **Evaluation**: Measure actual loss reduction and ROI
        
        ## Additional Resources
        
        - [FAO Guidelines on Prevention of Post-Harvest Losses](http://www.fao.org/3/a-i7443e.pdf)
        - [IITA Post-Harvest Management](https://www.iita.org/research/research-themes/post-harvest-management/)
        - [Nigerian Stored Products Research Institute](https://nspri.gov.ng/)
        """
        
        return report
    
    def find_market_connections(self, crop, state, quantity, quality):
        """Find market connections based on inputs."""
        if not crop or not state or not quantity or not quality:
            return "Please fill in all fields to find market connections."
        
        try:
            quantity = float(quantity)
        except ValueError:
            return "Quantity must be a number."
        
        # Simulate market data (in a real app, this would come from a database or API)
        markets = get_market_data(crop, state, quality)
        
        # Format the output as a report
        report = f"""
        # Market Connection Opportunities for {crop} from {state}
        
        ## Your Product
        - Crop: **{crop}**
        - Quantity available: **{quantity:,.2f} tonnes**
        - Quality grade: **{quality}**
        - Location: **{state}**
        
        ## Potential Buyers
        """
        
        for i, market in enumerate(markets, 1):
            report += f"""
            ### {i}. {market['name']}
            
            - **Location:** {market['location']}
            - **Distance from {state}:** {market['distance']} km
            - **Buying price:** ₦{market['price']:,.2f}/tonne
            - **Potential value:** ₦{market['price'] * min(quantity, market['demand']):,.2f}
            - **Demand:** {market['demand']:,.2f} tonnes
            - **Quality requirements:** {market['quality_requirements']}
            - **Contact:** {market['contact']}
            """
        
        report += """
        ## Next Steps
        
        1. **Contact**: Reach out to potential buyers to confirm current demand and prices
        2. **Negotiation**: Discuss terms, including delivery logistics and payment terms
        3. **Documentation**: Prepare necessary documentation for the transaction
        4. **Logistics**: Arrange transportation and handling
        5. **Delivery**: Ensure timely delivery of the product in the agreed condition
        
        ## Market Intelligence Resources
        
        - [Nigeria Agricultural Market Information System](https://namis.gov.ng/)
        - [AFEX Commodity Exchange](https://afexnigeria.com/)
        - [National Bureau of Statistics - Agricultural Data](https://nigerianstat.gov.ng/)
        """
        
        return report
    
    def create_ui(self):
        """Create the Gradio interface."""
        with gr.Blocks(title="AgriPreserve Dashboard") as demo:
            gr.Markdown("""
            # AgriPreserve: Nigeria Post-Harvest Loss Analysis Dashboard
            
            This dashboard provides analysis and visualization of post-harvest losses across different crops and regions in Nigeria.
            It also offers recommendations for storage solutions and market connections to reduce losses and improve farmer income.
            """)
            
            with gr.Tab("Loss Analysis"):
                with gr.Row():
                    with gr.Column():
                        state_dropdown = gr.Dropdown(
                            label="Select State",
                            choices=self.get_states(),
                            value="All States"
                        )
                        crop_dropdown = gr.Dropdown(
                            label="Select Crop",
                            choices=self.get_crops(),
                            value="All Crops"
                        )
                        region_dropdown = gr.Dropdown(
                            label="Select Region",
                            choices=self.get_regions(),
                            value="All Regions"
                        )
                        analyze_btn = gr.Button("Analyze Losses")
                
                with gr.Tabs():
                    with gr.TabItem("Loss Percentage"):
                        percentage_plot = gr.Plot()
                        percentage_data = gr.File(label="Download Data (CSV)")
                    
                    with gr.TabItem("Loss Tonnage"):
                        tonnage_plot = gr.Plot()
                        tonnage_data = gr.File(label="Download Data (CSV)")
            
            with gr.Tab("Summary Statistics"):
                summary_btn = gr.Button("Generate Summary Statistics")
                summary_output = gr.Markdown()
            
            with gr.Tab("High-Opportunity Areas"):
                opportunity_btn = gr.Button("Find High-Opportunity Areas")
                opportunity_output = gr.Markdown()
            
            with gr.Tab("Crop Comparison"):
                compare_btn = gr.Button("Compare Crops")
                with gr.Row():
                    tonnage_comparison = gr.Plot()
                    percentage_comparison = gr.Plot()
                comparison_data = gr.File(label="Download Data (CSV)")
            
            with gr.Tab("Storage Recommendations"):
                with gr.Row():
                    with gr.Column():
                        rec_crop = gr.Dropdown(
                            label="Select Crop",
                            choices=["Maize", "Rice", "Sorghum", "Millet"],
                            value="Maize"
                        )
                        rec_state = gr.Dropdown(
                            label="Select State",
                            choices=self.get_states()[1:],  # Exclude "All States"
                            value=self.get_states()[1] if len(self.get_states()) > 1 else None
                        )
                        rec_quantity = gr.Number(label="Quantity (tonnes)", value=10)
                        rec_months = gr.Slider(label="Storage Duration (months)", minimum=1, maximum=24, value=6, step=1)
                        rec_btn = gr.Button("Get Storage Recommendations")
                
                rec_output = gr.Markdown()
            
            with gr.Tab("Market Connections"):
                with gr.Row():
                    with gr.Column():
                        market_crop = gr.Dropdown(
                            label="Select Crop",
                            choices=["Maize", "Rice", "Sorghum", "Millet"],
                            value="Maize"
                        )
                        market_state = gr.Dropdown(
                            label="Select State",
                            choices=self.get_states()[1:],  # Exclude "All States"
                            value=self.get_states()[1] if len(self.get_states()) > 1 else None
                        )
                        market_quantity = gr.Number(label="Quantity Available (tonnes)", value=10)
                        market_quality = gr.Dropdown(
                            label="Quality Grade",
                            choices=["Premium", "Standard", "Basic"],
                            value="Standard"
                        )
                        market_btn = gr.Button("Find Market Connections")
                
                market_output = gr.Markdown()
            
            # Set up event handlers
            analyze_btn.click(
                self.plot_loss_percentage,
                inputs=[state_dropdown, crop_dropdown, region_dropdown],
                outputs=[percentage_plot, percentage_data]
            )
            
            analyze_btn.click(
                self.plot_loss_tonnes,
                inputs=[state_dropdown, crop_dropdown, region_dropdown],
                outputs=[tonnage_plot, tonnage_data]
            )
            
            summary_btn.click(
                self.get_summary_statistics,
                inputs=[],
                outputs=[summary_output]
            )
            
            opportunity_btn.click(
                self.get_high_opportunity_areas,
                inputs=[],
                outputs=[opportunity_output]
            )
            
            compare_btn.click(
                self.crop_comparison,
                inputs=[],
                outputs=[tonnage_comparison, percentage_comparison, comparison_data]
            )
            
            rec_btn.click(
                self.generate_storage_recommendations,
                inputs=[rec_crop, rec_state, rec_quantity, rec_months],
                outputs=[rec_output]
            )
            
            market_btn.click(
                self.find_market_connections,
                inputs=[market_crop, market_state, market_quantity, market_quality],
                outputs=[market_output]
            )
            
            return demo

# Helper functions for recommendations
def get_crop_price(crop):
    """Get the current market price for a crop (in Naira per tonne)."""
    prices = {
        "Maize": 180000,
        "Rice": 350000,
        "Sorghum": 160000,
        "Millet": 170000
    }
    return prices.get(crop, 100000)

def get_storage_recommendations(crop, state, duration):
    """Get storage recommendations based on crop, state, and duration."""
    # This would ideally be based on a more sophisticated model
    # that takes into account local climate conditions, etc.
    
    recommendations = []
    
    if crop == "Maize":
        recommendations.append({
            "name": "Hermetic Storage Bags",
            "description": "Airtight bags that create a modified atmosphere, preventing insect infestation and mold growth.",
            "cost": "₦2,000-3,000 per bag (holds ~100kg)",
            "loss_reduction": "Reduces losses by 80-90%",
            "duration_suitability": "Excellent for 6-12 months",
            "complexity": "Low - easy to implement"
        })
        
        if duration > 6:
            recommendations.append({
                "name": "Metal Silos",
                "description": "Sealed metal containers that protect grain from pests, moisture, and theft.",
                "cost": "₦50,000-150,000 (capacity 500-1,500kg)",
                "loss_reduction": "Reduces losses by 95-98%",
                "duration_suitability": "Excellent for long-term storage (1-2+ years)",
                "complexity": "Medium - requires proper installation"
            })
    
    elif crop == "Rice":
        recommendations.append({
            "name": "Improved Rice Storage Systems",
            "description": "Specialized storage systems designed for rice, with moisture control features.",
            "cost": "₦30,000-80,000 per tonne capacity",
            "loss_reduction": "Reduces losses by 70-85%",
            "duration_suitability": "Good for 6-18 months",
            "complexity": "Medium - requires training"
        })
    
    elif crop in ["Sorghum", "Millet"]:
        recommendations.append({
            "name": "Traditional Improved Granaries",
            "description": "Modified traditional storage structures with improved features for pest and moisture control.",
            "cost": "₦20,000-40,000 per structure",
            "loss_reduction": "Reduces losses by 60-75%",
            "duration_suitability": "Good for 6-12 months",
            "complexity": "Low - builds on existing knowledge"
        })
    
    # Add general recommendations for all crops
    if duration <= 6:
        recommendations.append({
            "name": "Improved Bag Storage with Pallets and Tarpaulins",
            "description": "Enhanced traditional bag storage using pallets, proper stacking, and covering with tarpaulins.",
            "cost": "₦5,000-15,000 per tonne capacity",
            "loss_reduction": "Reduces losses by 40-60%",
            "duration_suitability": "Good for short-term storage (1-6 months)",
            "complexity": "Low - easy to implement"
        })
    else:
        recommendations.append({
            "name": "Community Warehouse with Temperature Monitoring",
            "description": "Shared warehouse facility with basic climate control and regular monitoring.",
            "cost": "₦100,000-300,000 for community setup (10-30 tonnes capacity)",
            "loss_reduction": "Reduces losses by 70-85%",
            "duration_suitability": "Excellent for medium to long-term storage (6-24 months)",
            "complexity": "Medium-High - requires community organization and management"
        })
    
    return recommendations

def get_market_data(crop, state, quality):
    """Get market data based on crop, state, and quality."""
    # This would ideally come from a database or external API
    # Here we're generating simulated data
    
    base_price = get_crop_price(crop)
    
    # Adjust price based on quality
    if quality == "Premium":
        price_factor = 1.2
    elif quality == "Standard":
        price_factor = 1.0
    else:  # Basic
        price_factor = 0.8
    
    # Generate some simulated market connections
    markets = [
        {
            "name": "Lagos Food Distribution Center",
            "location": "Lagos",
            "distance": 120,
            "price": base_price * price_factor * 1.1,
            "demand": 50,
            "quality_requirements": "Moisture content below 14%, minimal impurities",
            "contact": "foodcenter@lagos.com | +234 801 234 5678"
        },
        {
            "name": "Northern Agro Processors",
            "location": "Kano",
            "distance": 200,
            "price": base_price * price_factor * 0.95,
            "demand": 100,
            "quality_requirements": "Clean, sorted, and properly dried",
            "contact": "info@northernagro.com | +234 802 345 6789"
        },
        {
            "name": "Eastern Mills Ltd",
            "location": "Enugu",
            "distance": 150,
            "price": base_price * price_factor * 1.05,
            "demand": 30,
            "quality_requirements": "High quality with certification preferred",
            "contact": "procurement@easternmills.ng | +234 803 456 7890"
        }
    ]
    
    return markets

def launch_ui(api_base_url=DEFAULT_API_BASE_URL):
    """Launch the Gradio UI."""
    ui = AgriPreserveUI(api_base_url)
    demo = ui.create_ui()
    demo.launch(share=True)

if __name__ == "__main__":
    launch_ui()
