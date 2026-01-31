from flask import  Blueprint, render_template
from nanoid import generate
import os
from utils.sessions_helpers import update_session

home_bp = Blueprint("home_bp", __name__)

@home_bp.route('/')
def main():
    sid = generate()
    # Generate upload and generated folders for the new session
    
    os.makedirs(f'./static/db/upload/{sid}', exist_ok=True) # Create upload folder
    os.makedirs(f'./static/db/generated/{sid}', exist_ok=True) # Create generated folder
    update_session(sid)
    return render_template('index.html', sid=sid)