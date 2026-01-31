from flask import Blueprint, request, make_response, jsonify
from nanoid import generate
import base64
from services.image_thresholding import apply_otsu_thresholding, apply_optimal_thresholding, apply_spectral_thresholding, apply_mean_local_thresholding
from services.image_segmentation import apply_region_growing, apply_agglomerative_clustering

image_thresholding_segmentation_bp = Blueprint("image_thresholding_segmentation_bp", __name__)

@image_thresholding_segmentation_bp.route('/image_thresholding_segmentation', methods=['POST'])
def apply_threshold():
    req = request.get_json()
    upld_img = base64.b64decode(req["orImg"].split(',')[1])

    upld_img_file = f'./static/db/upload/{req["sid"]}/{generate()}.png'

    with open(upld_img_file, 'wb') as f:
        f.write(upld_img)

    dwn_img_path = upld_img_file
    
    if (req["thType"] == "otsu_thresholding"):
        dwn_img_path = apply_otsu_thresholding(upld_img_file, req['sid'])
        
    elif (req["thType"] == "optimal_thresholding"):
        dwn_img_path = apply_optimal_thresholding(upld_img_file, req['sid'])
        
    elif (req["thType"] == "spectral_thresholding_mod"):
        dwn_img_path = apply_spectral_thresholding(upld_img_file, req['sid'])
        
    elif (req["thType"] == "local_thresholding"):
        dwn_img_path = apply_mean_local_thresholding(upld_img_file, int(req["lclBlockSize"]), int(req["lclThresholdWeight"]), req['sid'])
   
    elif (req["thType"] == "region_growing"):
        dwn_img_path = apply_region_growing(upld_img_file, int(req["lclBlockSize"]), int(req["lclThresholdWeight"]), req['sid'])
        
    elif (req["thType"] == "agglomerative_clustring"):
        dwn_img_path = apply_agglomerative_clustering(upld_img_file, int(req["lclBlockSize"]), int(req["lclThresholdWeight"]), req['sid'])
        
        
    # elif (req["thType"] == "k_mean_segmentation"):
    #     dwn_img_path = kms.apply_kmeans_segmentation(upld_img_file, int(
    #         req["lclBlockSize"]), int(req["lclThresholdWeight"]))
        
    # elif (req["thType"] == "mean_shift_segmentation"):
    #     dwn_img_path = mns.apply_mean_shift(upld_img_file)
        
    # elif (req["thType"] == "rgb_luv"):
    #     dwn_img_path = luv.rgb_luv(upld_img_file)
    # elif (req["thType"] == "spectral_thresholding"):
    #     if (req["mode"] == "hard_thresholding"):
    #         dwn_img_path = spt.apply_hard_thresholding(
    #             upld_img_file, float(req["threshold"]))
    #     elif (req["mode"] == "soft_thresholding"):
    #         dwn_img_path = spt.apply_soft_thresholding(
    #             upld_img_file, float(req["threshold"]), float(req["reduction"]))
    #     elif (req["mode"] == "garrote_thresholding"):
    #         dwn_img_path = spt.apply_garrote_thresholding(
    #             upld_img_file, float(req["threshold"]), float(req["reduction"]))
            

    res = make_response(
        jsonify({'Message': "Transformation has been done successfully", "img": dwn_img_path}), 200)
    return res
