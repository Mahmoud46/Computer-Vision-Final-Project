import cv2
import numpy as np
from nanoid import generate
from utils.image_processing_helpers import conv


'''Edge Detection Filters'''
# Canny Filter
def add_canny_filter(img_path, high_threshold, low_threshold, sid):
    img = cv2.imread(img_path, 0)
    gauss = cv2.GaussianBlur(img, (3, 3), 0)

    Ix = cv2.Sobel(gauss, cv2.CV_64F, 1, 0)
    Iy = cv2.Sobel(gauss, cv2.CV_64F, 0, 1)
    sobel = np.sqrt(np.square(Ix) + np.square(Iy))
    theta = np.arctan2(Iy, Ix)

    M, N = sobel.shape
    Z = np.zeros((M, N), dtype=np.int32)
    angle = theta * 180. / np.pi
    angle[angle < 0] += 180

    for i in range(1, M-1):
        for j in range(1, N-1):
            q = 255
            r = 255

            # angle 0
            if (0 <= angle[i, j] < 22.5) or (157.5 <= angle[i, j] <= 180):
                q = sobel[i, j+1]
                r = sobel[i, j-1]
            # angle 45
            elif (22.5 <= angle[i, j] < 67.5):
                q = sobel[i+1, j-1]
                r = sobel[i-1, j+1]
            # angle 90
            elif (67.5 <= angle[i, j] < 112.5):
                q = sobel[i+1, j]
                r = sobel[i-1, j]
            # angle 135
            elif (112.5 <= angle[i, j] < 157.5):
                q = sobel[i-1, j-1]
                r = sobel[i+1, j+1]

            if (sobel[i, j] >= q) and (sobel[i, j] >= r):
                Z[i, j] = sobel[i, j]
            else:
                Z[i, j] = 0

    highThreshold = high_threshold
    lowThreshold = low_threshold

    M, N = Z.shape
    res = np.zeros((M, N), dtype=np.int32)

    weak = np.int32(25)
    strong = np.int32(255)

    strong_i, strong_j = np.where(Z >= highThreshold)
    zeros_i, zeros_j = np.where(Z < lowThreshold)

    weak_i, weak_j = np.where((Z <= highThreshold) & (Z >= lowThreshold))

    res[strong_i, strong_j] = strong
    res[weak_i, weak_j] = weak

    strong = 255
    M, N = res.shape
    for i in range(1, M-1):
        for j in range(1, N-1):
            if (res[i, j] == weak):
                try:
                    if ((res[i+1, j-1] == strong) or (res[i+1, j] == strong) or (res[i+1, j+1] == strong)
                        or (res[i, j-1] == strong) or (res[i, j+1] == strong)
                            or (res[i-1, j-1] == strong) or (res[i-1, j] == strong) or (res[i-1, j+1] == strong)):
                        res[i, j] = strong
                    else:
                        res[i, j] = 0
                except IndexError as e:
                    pass

    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, res)

    return img_path

def apply_canny_filter(img_path, high_threshold, low_threshold, sid):
    # Read image
    img = cv2.imread(img_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply Canny
    edges = cv2.Canny(gray, threshold1=low_threshold, threshold2=high_threshold)
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, edges)

    return img_path
    
# Prewitt Edge Detection Filter
def add_prewitt_filter(img_path, sid):
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img_x = conv(img, [[-1, 0, 1],
                       [-1, 0, 1],
                       [-1, 0, 1]])
    img_y = conv(img, [[-1, -1, -1],
                       [0, 0, 0],
                       [1, 1, 1]])
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img_x+img_y)
    return img_path

def apply_prewitt_filter(img_path, sid):
    gray = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)

    # Prewitt kernels
    kernel_x = np.array([[-1, 0, 1],
                        [-1, 0, 1],
                        [-1, 0, 1]])

    kernel_y = np.array([[ 1,  1,  1],
                        [ 0,  0,  0],
                        [-1, -1, -1]])

    # Apply filters
    prewitt_x = cv2.filter2D(gray, -1, kernel_x)
    prewitt_y = cv2.filter2D(gray, -1, kernel_y)

    # Gradient magnitude
    prewitt = np.sqrt(prewitt_x**2 + prewitt_y**2)
    prewitt = np.uint8(prewitt / prewitt.max() * 255)
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, prewitt)
    return img_path
    
# Roberts Edge Detection Filter
def add_roberts_filter(img_path, sid):
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img_x = conv(img, [[1, 0],
                       [0, -1]])
    img_y = conv(img, [[0, 1],
                       [-1, 0]])
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img_x+img_y)
    return img_path

def apply_roberts_filter(img_path, sid):
    gray = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    
    # Roberts kernels
    kernel_x = np.array([[1, 0],
                        [0, -1]])

    kernel_y = np.array([[0, 1],
                        [-1, 0]])
    # Apply filters
    roberts_x = cv2.filter2D(gray, cv2.CV_64F, kernel_x)
    roberts_y = cv2.filter2D(gray, cv2.CV_64F, kernel_y)
    
    # Gradient magnitude
    roberts = np.sqrt(roberts_x**2 + roberts_y**2)
    roberts = np.uint8(roberts / roberts.max() * 255)
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, roberts)
    return img_path
    
# Sobel Edge Detection Filter
def add_sobel_filter(img_path, sid):
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img_x = conv(img, [[-1, 0, 1],
                       [-2, 0, 2],
                       [-1, 0, 1]])
    img_y = conv(img, [[-1, -2, -1],
                       [0, 0, 0],
                       [1, 2, 1]])
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img_x+img_y)
    return img_path

def apply_sobel_filter(img_path, sid):
    gray = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    
    # Sobel gradients
    sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)

    # Gradient magnitude
    sobel_mag = np.sqrt(sobel_x**2 + sobel_y**2)
    sobel_mag = np.uint8(sobel_mag / sobel_mag.max() * 255)
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, sobel_mag)
    return img_path