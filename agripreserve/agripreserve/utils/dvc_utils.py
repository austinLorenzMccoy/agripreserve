"""DVC utilities for AgriPreserve."""

import os
import subprocess
from typing import List, Optional, Dict, Any, Union


def run_dvc_command(command: List[str]) -> Dict[str, Any]:
    """
    Run a DVC command and return the result.
    
    Args:
        command: List of command parts to run.
        
    Returns:
        Dictionary with success status, stdout, and stderr.
    """
    try:
        result = subprocess.run(
            ["dvc"] + command,
            capture_output=True,
            text=True,
            check=False
        )
        return {
            "success": result.returncode == 0,
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except Exception as e:
        return {
            "success": False,
            "stdout": "",
            "stderr": str(e),
            "returncode": -1
        }


def track_file(file_path: str, message: Optional[str] = None) -> Dict[str, Any]:
    """
    Track a file with DVC.
    
    Args:
        file_path: Path to the file to track.
        message: Optional commit message.
        
    Returns:
        Dictionary with success status and output.
    """
    if not os.path.exists(file_path):
        return {
            "success": False,
            "output": f"File {file_path} does not exist."
        }
    
    # Add file to DVC
    add_result = run_dvc_command(["add", file_path])
    if not add_result["success"]:
        return {
            "success": False,
            "output": f"Failed to add file to DVC: {add_result['stderr']}"
        }
    
    # Add DVC file to git
    dvc_file = f"{file_path}.dvc"
    if os.path.exists(dvc_file):
        try:
            subprocess.run(["git", "add", dvc_file], check=True, capture_output=True)
            
            # Commit if message is provided
            if message:
                subprocess.run(["git", "commit", "-m", message], check=True, capture_output=True)
                
            return {
                "success": True,
                "output": f"Successfully tracked {file_path} with DVC and added to git."
            }
        except subprocess.CalledProcessError as e:
            return {
                "success": False,
                "output": f"Git operation failed: {e.stderr.decode() if e.stderr else str(e)}"
            }
    else:
        return {
            "success": False,
            "output": f"DVC file {dvc_file} was not created."
        }


def track_directory(dir_path: str, message: Optional[str] = None) -> Dict[str, Any]:
    """
    Track a directory with DVC.
    
    Args:
        dir_path: Path to the directory to track.
        message: Optional commit message.
        
    Returns:
        Dictionary with success status and output.
    """
    if not os.path.isdir(dir_path):
        return {
            "success": False,
            "output": f"Directory {dir_path} does not exist."
        }
    
    # Add directory to DVC
    add_result = run_dvc_command(["add", dir_path])
    if not add_result["success"]:
        return {
            "success": False,
            "output": f"Failed to add directory to DVC: {add_result['stderr']}"
        }
    
    # Add DVC file to git
    dvc_file = f"{dir_path}.dvc"
    if os.path.exists(dvc_file):
        try:
            subprocess.run(["git", "add", dvc_file], check=True, capture_output=True)
            
            # Commit if message is provided
            if message:
                subprocess.run(["git", "commit", "-m", message], check=True, capture_output=True)
                
            return {
                "success": True,
                "output": f"Successfully tracked {dir_path} with DVC and added to git."
            }
        except subprocess.CalledProcessError as e:
            return {
                "success": False,
                "output": f"Git operation failed: {e.stderr.decode() if e.stderr else str(e)}"
            }
    else:
        return {
            "success": False,
            "output": f"DVC file {dvc_file} was not created."
        }


def setup_dagshub_remote(
    repository_url: str,
    remote_name: str = "dagshub"
) -> Dict[str, Any]:
    """
    Set up DAGsHub as a DVC remote.
    
    Args:
        repository_url: URL of the DAGsHub repository.
        remote_name: Name for the remote.
        
    Returns:
        Dictionary with success status and output.
    """
    # Format the DVC remote URL
    dvc_url = repository_url.replace("github.com", "dagshub.com").strip("/")
    if not dvc_url.endswith(".git"):
        dvc_url += ".git"
    dvc_url = dvc_url.replace("https://", "https://dvc:")
    
    # Add the remote
    add_result = run_dvc_command(["remote", "add", remote_name, dvc_url])
    if not add_result["success"]:
        return {
            "success": False,
            "output": f"Failed to add DAGsHub remote: {add_result['stderr']}"
        }
    
    # Set the remote as default
    default_result = run_dvc_command(["remote", "default", remote_name])
    if not default_result["success"]:
        return {
            "success": False,
            "output": f"Failed to set DAGsHub as default remote: {default_result['stderr']}"
        }
    
    return {
        "success": True,
        "output": f"Successfully set up DAGsHub remote '{remote_name}'."
    }


def push_to_remote(remote_name: Optional[str] = None) -> Dict[str, Any]:
    """
    Push tracked data to the DVC remote.
    
    Args:
        remote_name: Optional name of the remote to push to.
        
    Returns:
        Dictionary with success status and output.
    """
    command = ["push"]
    if remote_name:
        command.extend(["-r", remote_name])
    
    push_result = run_dvc_command(command)
    return {
        "success": push_result["success"],
        "output": push_result["stdout"] if push_result["success"] else push_result["stderr"]
    }


def pull_from_remote(remote_name: Optional[str] = None) -> Dict[str, Any]:
    """
    Pull tracked data from the DVC remote.
    
    Args:
        remote_name: Optional name of the remote to pull from.
        
    Returns:
        Dictionary with success status and output.
    """
    command = ["pull"]
    if remote_name:
        command.extend(["-r", remote_name])
    
    pull_result = run_dvc_command(command)
    return {
        "success": pull_result["success"],
        "output": pull_result["stdout"] if pull_result["success"] else pull_result["stderr"]
    }
