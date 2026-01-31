import cv2
import numpy as np
from utils.image_processing_helpers import get_unique

def grayscale_mode(img_path):
    unique, count = np.unique(cv2.imread(img_path, 0), return_counts=True)
    return [unique.tolist(), count.tolist()]

def get_rgb(img_path):
    b, g, r = cv2.split(cv2.imread(img_path))
    r_scale = get_unique(r)
    g_scale = get_unique(g)
    b_scale = get_unique(b)
    return [r_scale, g_scale, b_scale]


def get_gray(img_path):
    return get_unique(cv2.imread(img_path, 0))

def get_cumulative_curve(img_path):
    list_x = []
    for i in range(256):
        list_x.append(i)
    image = cv2.imread(img_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    flat = image.flatten()
    # array with size of bins, set to zeros
    hist = np.zeros(256)
    # loop through pixels and sum up counts of pixels
    for pixel in flat:
        hist[pixel] += 1
    # create our cumulative sum
    hist = iter(hist)
    b = [next(hist)]
    for i in hist:
        b.append(b[-1] + i)
    cs = np.array(b)

    return [list_x, cs.tolist()]