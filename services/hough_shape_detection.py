import cv2
import numpy as np
from nanoid import generate
from utils.hough_shape_detection_helpers import hough_peaks, hough_lines_draw, draw_circles, adaptive_threshold

def line_detection(img, peaksnum, sid):
    # reding the photo and applying canny edge detection on it
    image = cv2.imread(img)
    grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(grey, (5, 5), 0)
    edge = cv2.Canny(blur, 50, 150)
    # Get image dimensions
    # y for rows and x for columns
    Ny = edge.shape[0]
    Nx = edge.shape[1]

    # Max diatance is diagonal one
    Maxdist = int(np.round(np.sqrt(Nx**2 + Ny ** 2)))
    # Theta in range from -90 to 90 degrees
    thetas = np.deg2rad(np.arange(-90, 90))
    # Range of radius
    rhos = np.linspace(-Maxdist, Maxdist, 2*Maxdist)
    accumulator = np.zeros((2 * Maxdist, len(thetas)))
    for y in range(Ny):
        for x in range(Nx):
            # Check if it is an edge pixel
            #  NB: y -> rows , x -> columns
            if edge[y, x] > 0:
                # Map edge pixel to hough space
                for k in range(len(thetas)):
                    # Calculate space parameter
                    r = x*np.cos(thetas[k]) + y * np.sin(thetas[k])
                    # Update the accumulator
                    # N.B: r has value -max to max
                    # map r to its idx 0 : 2*max
                    accumulator[int(r) + Maxdist, k] += 1
    # getting the indicies of peaks to draw it on the photo
    indicies, acci = hough_peaks(accumulator, peaksnum)
    print('done')
    img_path = hough_lines_draw(image, indicies, rhos, thetas, sid)
    return img_path

# 56 for cairo-building3.jpg
# 10 for xogame.png
# 24 for lines2.jpg
# 20 for images (1).png
# houghLine('lines2.jpg', 24)


# ===================================================================================================================

def circle_detection(input_img, threshold, region, sid, radius=None):
    imgread = cv2.imread(input_img)
    img = cv2.cvtColor(imgread, cv2.COLOR_BGR2GRAY)
    img = cv2.GaussianBlur(img, (5, 5), 1.5)
    img = cv2.Canny(img, 100, 200)
    (M, N) = img.shape
    if radius == None:
        R_max = np.max((M, N))
        R_min = 3
    else:
        [R_max, R_min] = radius

    print(radius)
    print(input_img)
    R = R_max - R_min
    # Initializing accumulator array.
    # Accumulator array is a 3 dimensional array with the dimensions representing
    # the radius, X coordinate and Y coordinate resectively.
    # Also appending a padding of 2 times R_max to overcome the problems of overflow
    A = np.zeros((R_max, M+2*R_max, N+2*R_max))
    B = np.zeros((R_max, M+2*R_max, N+2*R_max))

    # Precomputing all angles to increase the speed of the algorithm
    theta = np.arange(0, 360)*np.pi/180
    edges = np.argwhere(img[:, :])  # Extracting all edge coordinates
    for val in range(R):
        r = R_min+val
        # Creating a Circle Blueprint
        bprint = np.zeros((2*(r+1), 2*(r+1)))
        (m, n) = (r+1, r+1)  # Finding out the center of the blueprint
        for angle in theta:
            x = int(np.round(r*np.cos(angle)))
            y = int(np.round(r*np.sin(angle)))
            bprint[m+x, n+y] = 1
        constant = np.argwhere(bprint).shape[0]
        for x, y in edges:  # For each edge coordinates
            # Centering the blueprint circle over the edges
            # and updating the accumulator array
            X = [x-m+R_max, x+m+R_max]  # Computing the extreme X values
            Y = [y-n+R_max, y+n+R_max]  # Computing the extreme Y values
            A[r, X[0]:X[1], Y[0]:Y[1]] += bprint
        A[r][A[r] < threshold*constant/r] = 0

    for r, x, y in np.argwhere(A):
        temp = A[r-region:r+region, x-region:x+region, y-region:y+region]
        try:
            p, a, b = np.unravel_index(np.argmax(temp), temp.shape)
        except:
            continue
        B[r+(p-region), x+(a-region), y+(b-region)] = 1
    print('done')
    img_path = draw_circles(B[:, R_max:-R_max, R_max:-R_max], imgread, sid)
    return img_path


# detectCircles('planets.jpg', threshold=15, region=50,radius=[150, 100]) # for planets
# detectCircles('coin2.jpg', threshold=15, region=50,radius=[100, 40])  # for coin2

# ===================================================================================================================


def ellipse_detection(img_path, sid):
    image = cv2.imread(img_path)
    image = cv2.resize(image, (700, 700), cv2.INTER_CUBIC)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    r = (17, 51, 618, 611)

    image = image[int(r[1]):int(r[1]+r[3]), int(r[0]):int(r[0]+r[2])]
    pixel_vals = image.reshape((-1, 3))

    pixel_vals = np.float32(pixel_vals)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.75)

    k = 3
    retval, labels, centers = cv2.kmeans(
        pixel_vals, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

    centers = np.uint8(centers)
    segmented_data = centers[labels.flatten()]

    segmented_image = segmented_data.reshape((image.shape))

    mask = np.zeros(segmented_image.shape[:2], dtype=np.uint8)
    segmented_image = cv2.cvtColor(segmented_image, cv2.COLOR_BGR2GRAY)
    segmented_image = adaptive_threshold(segmented_image)
    contours, hierarchy = cv2.findContours(
        segmented_image, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    approx = []
    for cnt in contours[1:]:
        epsilon = 0.0001*cv2.arcLength(cnt, True)
        approx.append(cv2.approxPolyDP(cnt, epsilon, True))
        try:
            ellipse = cv2.fitEllipse(cnt)
            (x, y), (MA, ma), angle = ellipse
            MA = max(MA, ma)
            area = cv2.contourArea(cnt)
            equi_diameter = np.sqrt(4*area/np.pi)
            # print(MA/equi_diameter)
            if MA/equi_diameter < 1.5 and MA < max(mask.shape)/1.7:
                img = cv2.ellipse(mask, ellipse, (255, 255, 255), 3)
        except:
            pass
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img)
    return img_path
