from flask import Blueprint, request, make_response, jsonify
from nanoid import generate
import numpy as np
import base64
from services.features_matching import features_matching

ssd_ncc_receive_bp = Blueprint("ssd_ncc_receive_bp", __name__)

@ssd_ncc_receive_bp.route('/ssd_ncc_receive', methods=['POST'])
def ssd_ncc_receive():
    req = request.get_json()
    upld_img1 = base64.b64decode(req["img1"].split(',')[1])
    upld_img2 = base64.b64decode(req["img2"].split(',')[1])

    threshold = float(req['threshold'])
    mode = req['method']

    upld_img1_file = f'./static/db/upload/{req["sid"]}/{generate()}.png'
    upld_img2_file = f'./static/db/upload/{req["sid"]}/{generate()}.png'

    with open(upld_img1_file, 'wb') as f:
        f.write(upld_img1)
    with open(upld_img2_file, 'wb') as f:
        f.write(upld_img2)
        
    mode_time, img_rslt, sift_time = features_matching(upld_img1_file, upld_img2_file, threshold, mode, req["sid"])
    
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", "img": img_rslt, 'mode': mode, 'mode_time': np.round(mode_time, 2), 'sift_time': np.round(sift_time, 2)}), 200)
    return res
