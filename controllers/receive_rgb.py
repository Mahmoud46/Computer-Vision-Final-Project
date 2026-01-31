from flask import request, jsonify, make_response, Blueprint
from utils.helpers import modify_path
from services.image_histograms_curves import get_gray, get_rgb

receive_rgb_bp = Blueprint("receive_rgb_bp", __name__)

@receive_rgb_bp.route('/receive_rgb', methods=['POST'])
def recive_rgba_gray():
    req = request.get_json()
    rgb = get_rgb(modify_path(req['img']))
    gray = get_gray(modify_path(req['img']))
    if req['value'] == 'grayscale':
        values = gray
    elif req['value'] == 'redscale':
        values = rgb[0]
    elif req['value'] == 'greenscale':
        values = rgb[1]
    elif req['value'] == 'bluescale':
        values = rgb[2]
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", 'values': values}), 200)
    return res
