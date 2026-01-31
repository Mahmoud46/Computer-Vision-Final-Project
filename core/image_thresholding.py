import numpy as np
import cv2
from nanoid import generate

def global_threshold(img, sid):
    img = cv2.imread(img, 0)

    h = img.shape[0]
    w = img.shape[1]

    img_thres = np.zeros((h, w))
    n_pix = 0
    # loop over the image, pixel by pixel
    for y in range(0, h):
        for x in range(0, w):
            # threshold the pixel
            pixel = img[y, x]
            if pixel < 127:  # because pixel value will be between 0-255.
                n_pix = 0
            else:
                n_pix = pixel
            img_thres[y, x] = n_pix
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img_thres)
    return img_path

# Local Threshold
def local_threshold(img, sid):
    img = cv2.imread(img, 0)
    windowsize_r = 4
    windowsize_c = 4
    sub_img = []
    for r in range(0, img.shape[0] - windowsize_r, windowsize_r):
        for c in range(0, img.shape[1] - windowsize_c, windowsize_c):
            window = img[r:r+windowsize_r, c:c+windowsize_c]
            sub_img.append(window)
    average_list = []
    for iter1 in sub_img:
        height = iter1.shape[0]
        width = iter1.shape[1]
        sum = 0
        average = 0
        for i in range(0, width):
            for j in range(0, height):
                sum += iter1[i][j]
        average = sum/(width * height)
        average_list.append(average)

    new_image = []
    it = 0
    for iter in sub_img:
        height = iter.shape[0]
        width = iter.shape[1]
        for i in range(0, height):
            for j in range(0, width):
                if iter[i][j] > (average_list[it]-2):
                    iter[i][j] = 255
                else:
                    iter[i][j] = 0

        it = it+1
        new_image.append(iter)

    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img)
    return img_path

# New Local Threshold
def apply_local_threshold(img_path, sid):
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)

    window_h, window_w = 4, 4
    result = np.zeros_like(img)

    for r in range(0, img.shape[0], window_h):
        for c in range(0, img.shape[1], window_w):

            window = img[r:r+window_h, c:c+window_w]

            if window.size == 0:
                continue

            threshold = np.mean(window)

            # Apply threshold
            binary = np.where(window > threshold, 255, 0).astype(np.uint8)

            # Write back
            result[r:r+window_h, c:c+window_w] = binary

    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, result)

    return img_path

# 

def otsu_thresholding(img):
    # Calculate histogram and normalize it
    hist = cv2.calcHist([img], [0], None, [256], [0, 256])
    hist_norm = hist.ravel() / hist.max()

    # Calculate probabilities of each intensity level
    q = np.cumsum(hist_norm)
    m = np.cumsum(hist_norm * np.arange(256))

    # Calculate inter-class variance for all possible thresholds
    n = len(hist_norm)
    max_var, threshold = 0, 0
    for i in range(1, n):
        w0, w1 = q[i], q[n-1] - q[i]
        if w0 == 0 or w1 == 0:
            continue
        mu0, mu1 = m[i] / w0, (m[n-1] - m[i]) / w1
        var = w0 * w1 * (mu0 - mu1) ** 2
        if var > max_var:
            max_var = var
            threshold = i

    # Apply threshold to the image
    print(threshold)
    return cv2.threshold(img, threshold, 255, cv2.THRESH_BINARY)[1]

def optimal_thresholding(image):
    (height, width) = image.shape
    # initiate both background pixels and foreground elements
    bckGrnd = [image[0][0], image[0][width-1],
               image[height-1][0], image[height-1][width-1]]
    forGrnd = []
    for i in range(height):
        for j in range(width):
            if not ((i == 0 and j == 0) or (i == 0 and j == width-1) or (i == height-1 and j == 0) or (i == height-1 and j == width-1)):
                forGrnd.append(image[i][j])
    # initiate b background and foreground means
    av_bckGrnd = np.mean(bckGrnd)
    av_forGrnd = np.mean(forGrnd)
    thr = (av_bckGrnd+av_forGrnd)/2
    thr_prev = 0
    print(thr)
    while (not (thr_prev == thr)):
        bckGrnd = []
        forGrnd = []
        thr_prev = thr
        for i in range(height):
            for j in range(width):
                if (image[i][j] < thr):
                    bckGrnd.append(image[i][j])
                else:
                    forGrnd.append(image[i][j])
        av_bckGrnd = np.mean(bckGrnd)
        av_forGrnd = np.mean(forGrnd)
        thr = (av_bckGrnd+av_forGrnd)/2
    print(thr)
    return cv2.threshold(image, thr, 255, cv2.THRESH_BINARY)[1]

def spectral_thresholding(img):
    # Compute the histogram of the image
    hist, _ = np.histogram(img, 256, [0, 256])
    # Calculate the mean of the entire image
    mean = np.sum(np.arange(256) * hist) / float(img.size)
    # Initialize variables for the optimal threshold values and the maximum variance
    optimal_high = 0
    optimal_low = 0
    max_variance = 0
    # Loop over all possible threshold values, select ones with maximum variance between modes
    for high in range(0, 256):
        for low in range(0, high):
            w0 = np.sum(hist[0:low])
            if w0 == 0:
                continue
            mean0 = np.sum(np.arange(0, low) * hist[0:low]) / float(w0)
            # Calculate the weight and mean of the low pixels
            w1 = np.sum(hist[low:high])
            if w1 == 0:
                continue
            mean1 = np.sum(np.arange(low, high) * hist[low:high]) / float(w1)
            # Calculate the weight and mean of the high pixels
            w2 = np.sum(hist[high:])
            if w2 == 0:
                continue
            mean2 = np.sum(np.arange(high, 256) * hist[high:]) / float(w2)

            # Calculate the beween-class variance
            variance = w0 * (mean0 - mean) * 2 + w1 * \
                (mean1 - mean) * 2 + w2 * (mean2 - mean) ** 2
            # Update the optimal threshold values if the variance is greater than the maximum variance
            if variance > max_variance:
                max_variance = variance
                optimal_high = high
                optimal_low = low
    # Apply thresholding to the input image using the optimal threshold values
    binary = np.zeros(img.shape, dtype=np.uint8)
    binary[img < optimal_low] = 0
    binary[(img >= optimal_low) & (img < optimal_high)] = 128
    binary[img >= optimal_high] = 255
    return binary

def mean_local_thresholding(img, block_size, constant_c):
    neighborhood_size = block_size
    C = constant_c
    output = np.zeros_like(img)
    # Iterate over each pixel in the image
    for i in range(img.shape[0]):
        for j in range(img.shape[1]):
            # Compute the local threshold for the current pixel
            neighborhood = img[max(i-neighborhood_size//2, 0):min(i+neighborhood_size//2+1, img.shape[0]),
                               max(j-neighborhood_size//2, 0):min(j+neighborhood_size//2+1, img.shape[1])]
            threshold = np.mean(neighborhood) - C
            if img[i, j] > threshold:
                output[i, j] = 255
    return output

