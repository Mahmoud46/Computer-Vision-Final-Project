from flask import Blueprint, request, make_response, jsonify
from utils.helpers import modify_path,save
from services.hough_shape_detection import line_detection, circle_detection, ellipse_detection

hough_transform_bp = Blueprint("hough_transform_bp", __name__)

@hough_transform_bp.route('/hough_transform', methods=['POST'])
def receive_hough():
    req = request.get_json()
    img_path = save(modify_path(req['img']), req['sid'])
    
    hough_img = img_path
    
    if req['type'] == "detect_line":
        hough_img = line_detection(img_path, int(req['threshold']), req["sid"])
        
    elif req['type'] == "detect_circle":
        hough_img = circle_detection(img_path, threshold=int(req['threshold']), region=50, radius=[
                                        int(req['xradiaus']), int(req['yradius'])], sid=req["sid"])
        
    elif req['type'] == "detect_ellipse":
        hough_img = ellipse_detection(img_path, req["sid"])
        
    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", 'img': hough_img}), 200)
    return res
