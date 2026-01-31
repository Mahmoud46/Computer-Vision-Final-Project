import json, os
from config.paths import FACES_DB

def load_faces():
    """Load sessions from file safely."""
    if not os.path.exists(FACES_DB):
        return {}

    try:
        with open(FACES_DB, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return {}
    
def get_face(face_label):
    faces = load_faces()
    if faces[face_label]:
        return faces[face_label]
    return ""