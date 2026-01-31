import json, time, os, shutil
from config.paths import SESSIONS_DB, BASE_GENERATED_DIR, BASE_UPLOAD_DIR

def get_directories(path):
    """
    Returns a list of directory names inside the given path
    """
    if not os.path.exists(path):
        return []

    return [
        name for name in os.listdir(path)
        if os.path.isdir(os.path.join(path, name))
    ]


def delete_sessions_folders(sessions):
    sessions_folders = get_directories(BASE_UPLOAD_DIR)

    sids = []
    for sid in sessions:
        sids.append(sid)
        os.makedirs(f'{BASE_UPLOAD_DIR}/{sid}', exist_ok=True)
        os.makedirs(f'{BASE_GENERATED_DIR}/{sid}', exist_ok=True)
    
    for folder_name in sessions_folders:
        upload_folder_path = os.path.join(BASE_UPLOAD_DIR, folder_name)
        generated_folder_path = os.path.join(BASE_GENERATED_DIR, folder_name)
        
        if folder_name not in sids:
            if os.path.exists(upload_folder_path) and os.path.isdir(upload_folder_path):
                try:
                    shutil.rmtree(upload_folder_path)
                    print(f"Deleted folder: {upload_folder_path}")
                
                except Exception as e:
                    print(f"Failed to delete {upload_folder_path}: {e}")
                    
            if os.path.exists(generated_folder_path) and os.path.isdir(generated_folder_path):
                try:
                    shutil.rmtree(generated_folder_path)
                    print(f"Deleted folder: {generated_folder_path}")
                
                except Exception as e:
                    print(f"Failed to delete {generated_folder_path}: {e}")
                
    
def load_sessions():
    """Load sessions from file safely."""
    if not os.path.exists(SESSIONS_DB):
        return {}

    try:
        with open(SESSIONS_DB, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return {}


def save_sessions_data(sessions):
    """Save sessions to file."""
    with open(SESSIONS_DB, 'w', encoding='utf-8') as f:
        json.dump(sessions, f, indent=2)
        
    delete_sessions_folders(sessions)


def update_session(sid):
    if isinstance(sid, dict):
        raise TypeError("sid must be a string, not a dict")

    sessions_data = load_sessions()
    sessions_data[str(sid)] = time.time()
    save_sessions_data(sessions_data)



def get_sessions():
    return load_sessions()
