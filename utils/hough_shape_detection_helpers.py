import cv2
import numpy as np
from nanoid import generate

def hough_peaks(H, num_peaks, nhood_size=3):
    # loop through number of peaks to identify
    indices = []
    H1 = np.copy(H)
    for i in range(num_peaks):
        idx = np.argmax(H1)  # find argmax in flattened array
        H1_idx = np.unravel_index(idx, H1.shape)  # remap to shape of H
        indices.append(H1_idx)

        # surpass indices in neighborhood
        idx_y, idx_x = H1_idx  # first separate x, y indexes from argmax(H)
        # if idx_x is too close to the edges choose appropriate values
        if (idx_x - (nhood_size / 2)) < 0:
            min_x = 0
        else:
            min_x = idx_x - (nhood_size / 2)
        if (idx_x + (nhood_size / 2) + 1) > H.shape[1]:
            max_x = H.shape[1]
        else:
            max_x = idx_x + (nhood_size / 2) + 1

        # if idx_y is too close to the edges choose appropriate values
        if (idx_y - (nhood_size / 2)) < 0:
            min_y = 0
        else:
            min_y = idx_y - (nhood_size / 2)
        if (idx_y + (nhood_size / 2) + 1) > H.shape[0]:
            max_y = H.shape[0]
        else:
            max_y = idx_y + (nhood_size / 2) + 1

        # bound each index by the neighborhood size and set all values to 0
        for x in range(int(min_x), int(max_x)):
            for y in range(int(min_y), int(max_y)):
                # remove neighborhoods in H1
                H1[y, x] = 0

                # highlight peaks in original H
                if x == min_x or x == (max_x - 1):
                    H[y, x] = 255
                if y == min_y or y == (max_y - 1):
                    H[y, x] = 255

    # return the indices and the original Hough space with selected points
    return indices, H


def hough_lines_draw(img, indices, rhos, thetas, sid):
    rho = []
    for i in range(len(indices)):
        # reverse engineer lines from rhos and thetas
        # if(indices[i][0]<783):
        rho = rhos[int(indices[i][0])]
        # if(indices[i][1]<180):
        theta = thetas[int(indices[i][1])]
        a = np.cos(theta)
        b = np.sin(theta)
        x0 = a * rho
        y0 = b * rho
        # these are then scaled so that the lines go off the edges of the image
        x1 = int(x0 + 1000 * (-b))
        y1 = int(y0 + 1000 * (a))
        x2 = int(x0 - 1000 * (-b))
        y2 = int(y0 - 1000 * (a))

        cv2.line(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img)
    return img_path



def draw_circles(A, img, sid):
    circleCoordinates = np.argwhere(A)  # Extracting the circle information
    for r, x, y in circleCoordinates:
        cv2.circle(img, (y, x), r, color=(0, 255, 0), thickness=2)
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    # img_path = f'./static/download/edit/{randint(0,100000000000000000000)}_circle_detection.png'
    cv2.imwrite(img_path, img)
    return img_path


def adaptive_threshold(img, sub_thresh=0.10):
    image = img.copy()
    if image.shape[-1] == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    else:
        gray = image
    integralimage = cv2.integral(gray, cv2.CV_32F)

    width = gray.shape[1]
    height = gray.shape[0]
    win_length = int(width / 10)
    image_thresh = np.zeros((height, width, 1), dtype=np.uint8)
    for j in range(height):
        for i in range(width):
            x1 = i - win_length
            x2 = i + win_length
            y1 = j - win_length
            y2 = j + win_length
            if (x1 < 0):
                x1 = 0
            if (y1 < 0):
                y1 = 0
            if (x2 > width):
                x2 = width - 1
            if (y2 > height):
                y2 = height - 1
            count = (x2 - x1) * (y2 - y1)

            sum = integralimage[y2, x2] - integralimage[y1, x2] - \
                integralimage[y2, x1] + integralimage[y1, x1]
            if (int)(gray[j, i] * count) < (int)(sum * (1.0 - sub_thresh)):
                image_thresh[j, i] = 0
            else:
                image_thresh[j, i] = 255

    return image_thresh
