import cv2
import numpy as np
from nanoid import generate
from utils.image_processing_helpers import generate_av_kernel, conv

'''Noise Reduction Filters'''
# Median Filter
def add_median_filter(img_path, krnl_size, sid):
    '''This function takes two variable img_path => path of image and krnl_size => kernel size
    and return the path of the generated image'''
    img = cv2.imread(img_path, 0)  # convert image into grayscale
    img_h, img_w = img.shape
    temp_list = []
    indexer = krnl_size//2
    img_final = np.zeros((img_h, img_w))
    for i in range(img_h):
        for j in range(img_w):
            for z in range(krnl_size):
                if i+z-indexer < 0 or i+z-indexer > img_h-1:
                    for c in range(krnl_size):
                        temp_list.append(0)
                else:
                    if j+z-indexer < 0 or j+indexer > img_w-1:
                        temp_list.append(0)
                    else:
                        for k in range(krnl_size):
                            temp_list.append(img[i+z-indexer][j+k-indexer])
            temp_list.sort()
            img_final[i][j] = temp_list[len(temp_list)//2]
            temp_list = []
    img_path = f'./static/db/generated/{sid}/{generate()}_{krnl_size}.png'
    cv2.imwrite(img_path, img_final)
    return img_path

# New Median FIlter
def perform_median_filter(img_path, window_size, sid):
    '''This function takes two variable img_path => path of image and window_size => kernel size
    and return the path of the generated image'''
    img = cv2.imread(img_path, 0)
    filtered_img = np.zeros_like(img)
    padding_size = window_size // 2
    padded_img = np.pad(img, padding_size, mode='symmetric')
    for i in range(padding_size, len(img) + padding_size):
        for j in range(padding_size, len(img[0]) + padding_size):
            window = padded_img[i-padding_size:i+padding_size +
                                1, j-padding_size:j+padding_size+1].flatten()
            median = np.median(window)
            filtered_img[i-padding_size, j-padding_size] = median
            
    img_path = f'./static/db/generated/{sid}/{generate()}_{window_size}.png'
    cv2.imwrite(img_path, filtered_img)
    return img_path

def apply_median_filter(img_path, window_size, sid):
    # Read image
    gray = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)

    # Apply median filter
    median = cv2.medianBlur(gray, ksize=window_size)  # ksize must be odd
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, median)
    return img_path

# Average Filter
def add_average_filter(img_path, krnl_size, sid):
    '''This function takes two variables as it takes img_path => pathof image and krnl_size => size of kernel
    returns the path of generated signal'''
    img = cv2.imread(img_path, 0)  # read image in grayscale
    kernel = generate_av_kernel(krnl_size)
    img_path = f'./static/db/generated/{sid}/{generate()}_{krnl_size}.png'
    cv2.imwrite(img_path, conv(img, kernel))
    return img_path
    
# New Average Filter
def perform_average_filter(img_path, window_size, sid):
    '''This function takes two variable img_path => path of image and window_size => kernel size
    and return the path of the generated image'''
    img = cv2.imread(img_path, 0)
    filtered_img = np.zeros_like(img)
    padding_size = window_size // 2
    padded_img = np.pad(img, padding_size, mode='symmetric')
    for i in range(padding_size, len(img) + padding_size):
        for j in range(padding_size, len(img[0]) + padding_size):
            window = padded_img[i-padding_size:i+padding_size +
                                1, j-padding_size:j+padding_size+1].flatten()
            median = np.sum(window)/window_size**2
            filtered_img[i-padding_size, j-padding_size] = median
    img_path = f'./static/db/generated/{sid}/{generate()}_{window_size}.png'
    cv2.imwrite(img_path, filtered_img)
    return img_path

def apply_average_filter(img_path, krnl_size, sid):
    # Read image
    gray = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)

    # Apply average filter (mean filter)
    avg = cv2.blur(gray, (krnl_size, krnl_size))   # kernel size
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, avg)
    return img_path

# Gaussian Filter
def add_gaussian_filter(img_path, sid):
    img = cv2.imread(img_path, 0)  # read image in grayscale
    kernel = [[1/16, 2/16, 1/16],
              [2/16, 4/16, 2/16],
              [1/16, 2/16, 1/16]]
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, conv(img, kernel))
    return img_path

def apply_gaussian_filter(img_path, sid):
    # Read image
    gray = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    
    # Apply Gaussian blur
    gaussian = cv2.GaussianBlur(gray, (3, 3), sigmaX=1.0)
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, gaussian)
    return img_path