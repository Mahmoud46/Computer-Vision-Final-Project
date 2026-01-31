from flask import request, jsonify, make_response, Blueprint
from utils.helpers import modify_path
from services.image_histograms_curves import get_cumulative_curve

receive_cml_curve_bp = Blueprint("receive_cml_curve_bp", __name__)

@receive_cml_curve_bp.route('/receive_cml_curve', methods=['POST'])
def receive_cml():
    req = request.get_json()
    cml_value = get_cumulative_curve(modify_path(req['img']))
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", 'values': cml_value}), 200)
    return res