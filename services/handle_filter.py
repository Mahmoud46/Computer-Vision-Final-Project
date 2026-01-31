from services.frequency_filters import LPF_rgb, HPF_rgb
from core.edge_detection import apply_canny_filter, apply_prewitt_filter, apply_roberts_filter, apply_sobel_filter
from core.noise_reduction import apply_average_filter, apply_gaussian_filter, apply_median_filter
from core.noise_generation import add_gaussian_noise, add_salt_pepper_noise, add_uniform_noise
from utils.image_processing_helpers import convert_to_gray_scale
from core.image_thresholding import local_threshold, global_threshold
from core.image_enhancement import image_normalization, image_equalization
from core.corner_detection import harris_corner

def handle_filter(img_path, filter_name, sid):
    new_path_img = ''
    if filter_name == 'gaussian_noise':
        new_path_img = add_gaussian_noise(img_path, 0.05, sid)
    elif filter_name == 'average_filter':
        new_path_img = apply_average_filter(img_path, 9, sid)
    elif filter_name == 'gaussian_filter':
        new_path_img = apply_gaussian_filter(img_path, sid)
    elif filter_name == 'median_filter':
        new_path_img = apply_median_filter(img_path, 9, sid)
    elif filter_name == 'uniform_noise':
        new_path_img = add_uniform_noise(img_path, 'rgb', sid)
    elif filter_name == 'salt_Papper_noise':
        new_path_img = add_salt_pepper_noise(img_path, 0.05, sid)
    elif filter_name == 'sobel_filter':
        new_path_img = apply_sobel_filter(img_path, sid)
    elif filter_name == 'prewitt_filter':
        new_path_img = apply_prewitt_filter(img_path, sid)
    elif filter_name == 'roberts_filter':
        new_path_img = apply_roberts_filter(img_path, sid)
    elif filter_name == 'canny_filter':
        new_path_img = apply_canny_filter(img_path, 100, 100, sid)
    elif filter_name == "low_pass_filter":
        new_path_img = LPF_rgb(img_path, sid)
    elif filter_name == "high_pass_filter":
        new_path_img = HPF_rgb(img_path, sid)
    elif filter_name == "normalizer":
        new_path_img = image_normalization(img_path, sid)
    elif filter_name == "equalizer":
        new_path_img = image_equalization(img_path, 256, sid)
    elif filter_name == "gloabal_thresholding":
        new_path_img = global_threshold(img_path, sid)
    elif filter_name == "local_thresholding":
        new_path_img = local_threshold(img_path, sid)
    elif filter_name == "convert_to_grayscale":
        new_path_img = convert_to_gray_scale(img_path, sid)
    elif filter_name == "harris_corner":
        new_path_img = harris_corner(img_path, sid)
    return new_path_img
