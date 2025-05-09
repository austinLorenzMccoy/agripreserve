"""Script to clear DAGsHub token cache to fix 403 errors."""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

try:
    import dagshub
    import appdirs
    import json
    import shutil
except ImportError:
    print("Error: Required packages not installed. Installing...")
    os.system(f"{sys.executable} -m pip install dagshub appdirs")
    import dagshub
    import appdirs
    import json
    import shutil

# Load environment variables from .env file
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)
print(f"Loading .env from: {env_path} (exists: {env_path.exists()})")

# Get DAGsHub credentials from environment variables
dagshub_username = os.getenv("DAGSHUB_USERNAME")
dagshub_token = os.getenv("DAGSHUB_TOKEN")
dagshub_repo = os.getenv("DAGSHUB_REPO")

print(f"DAGsHub Username: {dagshub_username}")
print(f"DAGsHub Token: {dagshub_token[:5]}..." if dagshub_token else "DAGsHub Token: None")
print(f"DAGsHub Repo: {dagshub_repo}")

# Clear token cache
print("\nClearing DAGsHub token cache...")

# Manually clear the cache file
cache_dir = appdirs.user_cache_dir("dagshub", "dagshub")
token_cache_file = os.path.join(cache_dir, "tokens.json")
print(f"Looking for token cache file at: {token_cache_file}")

if os.path.exists(token_cache_file):
    try:
        # Backup the file first
        backup_file = token_cache_file + ".bak"
        shutil.copy2(token_cache_file, backup_file)
        print(f"Backed up token cache to: {backup_file}")
        
        # Remove the file
        os.remove(token_cache_file)
        print(f"Successfully removed token cache file: {token_cache_file}")
    except Exception as e:
        print(f"Error removing token cache file: {str(e)}")
else:
    print(f"Token cache file not found at: {token_cache_file}")
    
# Also check for other potential cache locations
alt_cache_dirs = [
    os.path.expanduser("~/.dagshub"),
    os.path.expanduser("~/.config/dagshub"),
    os.path.join(os.path.expanduser("~"), ".cache", "dagshub")
]

for alt_dir in alt_cache_dirs:
    if os.path.exists(alt_dir):
        print(f"Found alternative cache directory: {alt_dir}")
        for root, dirs, files in os.walk(alt_dir):
            for file in files:
                if "token" in file.lower() or "auth" in file.lower() or "cred" in file.lower():
                    try:
                        file_path = os.path.join(root, file)
                        backup_file = file_path + ".bak"
                        shutil.copy2(file_path, backup_file)
                        print(f"Backed up {file_path} to {backup_file}")
                        os.remove(file_path)
                        print(f"Removed potential cache file: {file_path}")
                    except Exception as e:
                        print(f"Error handling file {file}: {str(e)}")

# Add new app token for authentication
print("\nAdding new DAGsHub app token...")
dagshub.auth.add_app_token(dagshub_token)

print("\nTrying to initialize DAGsHub repository...")
try:
    dagshub.init(repo_owner=dagshub_username, repo_name=dagshub_repo, mlflow=True)
    print("Successfully initialized DAGsHub repository!")
except Exception as e:
    print(f"Error initializing DAGsHub repository: {str(e)}")

print("\nNext steps:")
print("1. Try pushing to DAGsHub again:")
print(f"   git push dagshub main")
print("2. If that doesn't work, update your remote with:")
print(f"   git remote set-url dagshub https://{dagshub_username}:{dagshub_token}@dagshub.com/{dagshub_username}/{dagshub_repo}.git")
print("3. Then try pushing again:")
print(f"   git push dagshub main")
