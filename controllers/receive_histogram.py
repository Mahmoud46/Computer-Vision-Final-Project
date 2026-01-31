from flask import Blueprint, request, jsonify, make_response
from utils.helpers import modify_path
from services.image_histograms_curves import grayscale_mode

receive_histogram_bp = Blueprint("receive_histogram_bp", __name__)

@receive_histogram_bp.route('/receive_histogram', methods=['POST'])
def receive_histogram():
    req = request.get_json()
    values = grayscale_mode(modify_path(req['img']))
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", 'values': values}), 200)
    return res