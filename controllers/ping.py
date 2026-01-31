from flask import Blueprint, request, jsonify
from utils.sessions_helpers import update_session

ping_bp = Blueprint("ping_bp", __name__)

@ping_bp.route("/ping", methods=["POST"])
def ping():
    req = request.get_json()
    sid = req['sid']
    if not sid:
        return jsonify({"error": "No sid provided"}), 400

    # Update last_seen for this sid
    update_session(sid)
    return jsonify({"status": "ok"}), 200

