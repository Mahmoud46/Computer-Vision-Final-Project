from flask import Blueprint, request, jsonify, make_response
import base64
from nanoid import generate


receive_img_bp = Blueprint("receive_img_bp", __name__)

@receive_img_bp.route('/receive_img', methods=['POST'])
def get_img():
    req = request.get_json()
    sid = req["sid"] # session id
    upld_img = base64.b64decode(req["img"].split(',')[1])

    upld_img_file = f'./static/db/upload/{sid}/{generate()}.png'

    with open(upld_img_file, 'wb') as f:
        f.write(upld_img)

    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", 'img': upld_img_file}), 200)
    return res
