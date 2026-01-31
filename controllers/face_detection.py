from flask import Blueprint, request, make_response, jsonify
import base64
from nanoid import generate
from services.face_detection import apply_face_detection

face_detection_bp = Blueprint("face_detection_bp", __name__)

@face_detection_bp.route('/face_detection', methods=['POST'])
def face_detection():
    req = request.get_json()
    upld_img = base64.b64decode(req["img"].split(',')[1])

    upld_img_file = f'./static/db/upload/{req["sid"]}/{generate()}.png'

    with open(upld_img_file, 'wb') as f:
        f.write(upld_img)

    img = apply_face_detection(upld_img_file, 12, 5, req['sid'])
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", "img": img}), 200)
    return res
