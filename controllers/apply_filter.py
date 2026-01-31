from flask import Blueprint, request, make_response, jsonify
from services.handle_filter import handle_filter
from utils.helpers import modify_path

apply_filter_bp = Blueprint("apply_filter_bp", __name__)

@apply_filter_bp.route('/apply_filter', methods=['POST'])
def apply_filter():
    req = request.get_json()
    # print(modify_path(req['img']))
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", 'img': handle_filter(modify_path(req['img']), req['value'], req["sid"])}), 200)
    return res