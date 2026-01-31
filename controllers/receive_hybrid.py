from flask import jsonify, request, Blueprint, make_response
from services.frequency_filters import hybrid_rgb
import base64
from nanoid import generate

receive_hybrid_bp = Blueprint("receive_hybrid_bp", __name__)

@receive_hybrid_bp.route("/receive_hybrid", methods=["POST"])
def get_hybrid_imgs():
    req = request.get_json()
    sid = req["sid"] # session id
    upld_img1 = base64.b64decode(req["img1"].split(',')[1])
    upld_img2 = base64.b64decode(req["img2"].split(',')[1])

    upld_img1_file = f'./static/db/upload/{sid}/{generate()}.png'
    upld_img2_file = f'./static/db/upload/{sid}/{generate()}.png'

    with open(upld_img1_file, 'wb') as f:
        f.write(upld_img1)
    with open(upld_img2_file, 'wb') as f:
        f.write(upld_img2)

    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", "img": hybrid_rgb(upld_img1_file, upld_img2_file, sid)}), 200)
    return res
