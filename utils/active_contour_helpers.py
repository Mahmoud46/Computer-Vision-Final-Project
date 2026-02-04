import matplotlib
matplotlib.use("Agg")   # MUST be before pyplot import
import numpy as np
import matplotlib.pyplot as plt
import cv2
import pylab as plb
import matplotlib.cm as cm
from PIL import Image
from nanoid import generate

def find_center(image_path):
    im = Image.open(image_path)
    immat = im.load()
    (X, Y) = im.size
    m = np.zeros((X, Y))
    for x in range(X):
        for y in range(Y):
            m[x, y] = immat[(x, y)] != (255, 255, 255)
    m = m / np.sum(np.sum(m))
    dx = np.sum(m, 1)
    dy = np.sum(m, 0)

    cx = np.sum(dx * np.arange(X))
    cy = np.sum(dy * np.arange(Y))

    return cx, cy

def display(image, changedPoint=None, snake=None, sid=None):
    fig, ax = plt.subplots(figsize=(6, 6))

    if snake is not None:
        for s in snake:
            if changedPoint is not None and s[0] == changedPoint[0] and s[1] == changedPoint[1]:
                ax.plot(s[0], s[1], 'r.', markersize=5)
            else:
                ax.plot(s[0], s[1], 'g.', markersize=5)

    ax.imshow(image, cmap=cm.Greys_r)
    ax.axis("off")

    img_path = ""
    if sid:
        img_path = f'./static/db/generated/{sid}/{generate()}.png'
        fig.savefig(img_path, bbox_inches="tight", pad_inches=0)

    plt.close(fig)
    return img_path


def imageGradient(gradient, snake):
    sum = 0
    snaxels_Len = len(snake)
    for index in range(snaxels_Len-1):
        point = snake[index]
        sum = sum+((gradient[point[1]][point[0]]))
    return sum

def point_inside(img, point):
    return np.all(point < np.shape(img)) and np.all(point > 0)

def img_gradient(img):
    gauss = cv2.GaussianBlur(img, (21, 21), 0)
    ix = cv2.Sobel(gauss, cv2.CV_64F, 1, 0, ksize=21)
    iy = cv2.Sobel(gauss, cv2.CV_64F, 0, 1, ksize=21)
    sobel = np.sqrt(np.square(ix) + np.square(iy))
    return sobel

def total_energy(gradient, image, snake, alpha, beta, w_line, w_edge):
    inter_Energy = internal_energy(snake, alpha, beta)
    ext_Energy = external_energy(gradient, image, snake, w_line, w_edge)
    tEnergy = inter_Energy+ext_Energy

    return tEnergy

def internal_energy(snake, alpha, beta):
    inter_Energy = 0
    snakeLength = len(snake)
    for index in range(snakeLength-1, -1, -1):
        nextPoint = (index+1) % snakeLength
        currentPoint = index % snakeLength
        previousePoint = (index - 1) % snakeLength
        inter_Energy = inter_Energy + (alpha * (np.linalg.norm(snake[nextPoint] - snake[currentPoint])**2))\
            + (beta * (np.linalg.norm(snake[nextPoint] - 2 *
                snake[currentPoint] + snake[previousePoint])**2))
    return inter_Energy

def external_energy(gradient, image, snake, w_line, w_edge):
    sum = 0
    snaxels_Len = len(snake)
    for index in range(snaxels_Len - 1):
        point = snake[index]
        sum = +(image[point[1]][point[0]])
        pixel = 255 * sum

    ext_Energy = w_line*pixel - w_edge*imageGradient(gradient, snake)

    return ext_Energy

def draw_circle(center, radius, num_points):
    points = np.zeros((num_points, 2), dtype=np.int32)
    for i in range(num_points):
        theta = float(i)/num_points * (2 * np.pi)
        x = center[0] + radius * np.cos(theta)
        y = center[1] + radius * np.sin(theta)
        p = [x, y]
        points[i] = p
    return points
