from flask import Blueprint, request, make_response, jsonify
from utils.helpers import modify_path
from services.active_contour import active_contour

active_contour_bp = Blueprint("active_contour_bp", __name__)

@active_contour_bp.route('/active_contour', methods=['POST'])
def receive_active_contour():
    req = request.get_json()
    
    active_contour_img = active_contour(
        modify_path(req['img']), 20, 0.3, 500, 30, 30, 350, req['sid'])
    

    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", 'img': active_contour_img}), 200)
    return res