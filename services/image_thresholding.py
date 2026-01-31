import cv2
from core.image_thresholding import otsu_thresholding, optimal_thresholding, spectral_thresholding, mean_local_thresholding
from nanoid import generate

def apply_otsu_thresholding(img_path, sid):
    img = cv2.imread(img_path, 0)  # read image in grayscale
    thresholded = otsu_thresholding(img)
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, thresholded)
    return img_path

def apply_optimal_thresholding(img_path, sid):
    image = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, optimal_thresholding(image))
    return img_path

def apply_spectral_thresholding(img, sid):
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, spectral_thresholding(cv2.imread(img, 0)))
    return img_path


def apply_mean_local_thresholding(img_path, block_size, constant_c, sid):
    img = cv2.imread(img_path, 0)
    print(block_size)
    print(constant_c)
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, mean_local_thresholding(img, block_size, constant_c))
    return img_path
