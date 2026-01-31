from utils.helpers import cleanup_sessions
import threading
from flask import Blueprint

start_cleanup_thread_bp = Blueprint("start_cleanup_thread_bp", __name__)

# Start the background thread **once before the first request**
# @start_cleanup_thread_bp.before_app_first_request
def start_cleanup_thread():
    thread = threading.Thread(target=cleanup_sessions, daemon=True)
    thread.start()
    print("Cleanup thread started")