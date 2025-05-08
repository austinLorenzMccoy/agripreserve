"""
Script to help set up the connection between GitHub and DAGsHub.
This script will provide instructions on how to manually set up the connection.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

# Get DAGsHub credentials from environment variables
dagshub_username = os.getenv("DAGSHUB_USERNAME")
dagshub_token = os.getenv("DAGSHUB_TOKEN")
dagshub_repo = os.getenv("DAGSHUB_REPO")

# Print instructions
print("""
=====================================================================
      INSTRUCTIONS FOR CONNECTING GITHUB TO DAGSHUB MANUALLY
=====================================================================

Since you're encountering a 403 error when trying to connect through the web interface,
here's how to set up the connection manually:

1. GITHUB SETUP:
   - Go to your GitHub repository: https://github.com/austinLorenzMccoy/agripreserve
   - Navigate to Settings > Webhooks
   - Click "Add webhook"
   - Set the following values:
     * Payload URL: https://dagshub.com/api/v1/webhooks/github
     * Content type: application/json
     * Secret: (leave blank)
     * Which events would you like to trigger this webhook?: "Just the push event"
     * Active: Checked
   - Click "Add webhook"

2. DAGSHUB SETUP:
   - Go to your DAGsHub repository: https://dagshub.com/austinLorenzMccoy/agripreserve
   - Navigate to Settings > Integrations
   - Look for GitHub integration and click "Connect"
   - Enter your GitHub repository URL: https://github.com/austinLorenzMccoy/agripreserve
   - Click "Connect"

3. ALTERNATIVE APPROACH:
   If the above methods don't work, you can manually sync your repositories:
   - Add DAGsHub as a second remote to your local repository:
     * git remote add dagshub https://austinLorenzMccoy:{token}@dagshub.com/austinLorenzMccoy/agripreserve.git
   - Push to both remotes when making changes:
     * git push origin main
     * git push dagshub main

Your DAGsHub credentials:
- Username: {username}
- Token: {token_masked}
- Repository: {repo}

=====================================================================
""".format(
    username=dagshub_username,
    token_masked=dagshub_token[:5] + "..." if dagshub_token else "None",
    token=dagshub_token,
    repo=dagshub_repo
))

# Print command to add DAGsHub as a remote
print("Command to add DAGsHub as a remote to your Git repository:")
print(f"git remote add dagshub https://{dagshub_username}:{dagshub_token}@dagshub.com/{dagshub_username}/{dagshub_repo}.git\n")

# Check if DAGsHub is already a remote
import subprocess
try:
    result = subprocess.run(
        ["git", "remote", "-v"],
        cwd=str(Path(__file__).parent),
        capture_output=True,
        text=True,
        check=True
    )
    remotes = result.stdout
    print("Current Git remotes:")
    print(remotes)
    
    if "dagshub" in remotes:
        print("\nDAGsHub is already configured as a remote!")
    else:
        print("\nDAGsHub is not yet configured as a remote. Use the command above to add it.")
except Exception as e:
    print(f"Error checking Git remotes: {str(e)}")
