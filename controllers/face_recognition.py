from flask import Blueprint, request, make_response, jsonify
import base64
from nanoid import generate
from services.face_recognition import apply_face_recognition

face_recognition_bp = Blueprint("face_recognition_bp", __name__)
@face_recognition_bp.route('/face_recognition', methods=['POST'])
def face_recognition():
    req = request.get_json()
    upld_img = base64.b64decode(req["img"].split(',')[1])

    upld_img_file = f'./static/db/upload/{req["sid"]}/{generate()}.png'

    with open(upld_img_file, 'wb') as f:
        f.write(upld_img)

    img, status, face_name = apply_face_recognition(upld_img_file)
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", "img": img, "stat": status, "prs_name":face_name}), 200)
    return res