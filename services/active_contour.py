import numpy as np
import matplotlib.pyplot as plt
import cv2
import copy
from utils.active_contour_helpers import img_gradient, find_center, draw_circle, point_inside, total_energy, display
from nanoid import generate


# alpha = 20
# beta = 3
# iterations = 500
# w_line = 30
# w_edge = 30
# radius = 200


def active_contour(image_path, alpha, beta, iterations, w_line, w_edge, radius, sid):
    # sid => session id
    neighbors = np.array([[i, j] for i in range(-1, 2) for j in range(-1, 2)])
    img = cv2.imread(image_path, 0)

    img_grad = img_gradient(img)
    cx, cy = find_center(image_path)
    # 130 160 (335,350)

    # print(cx)
    snake = draw_circle((cx, cy), radius, 40)

    snake_copy = copy.deepcopy(snake)

    for i in range(iterations):
        for index, point in enumerate(snake):
            min_energy = float("inf")
            for index2, move in enumerate(neighbors):
                next_point = (point + move)
                if not point_inside(img, next_point):
                    continue
                if not point_inside( img, point):
                        continue

                snake_copy[index] = next_point
                totalEnergyNext = total_energy(img_grad, img, snake_copy, alpha, beta, w_line, w_edge)
                if (totalEnergyNext < min_energy):
                    min_energy = copy.deepcopy(totalEnergyNext)
                    indexOFlessEnergy = copy.deepcopy(index2)
            snake[index] = (snake[index]+neighbors[indexOFlessEnergy])

    display(img, None, snake)
    
    return display(img, None, snake, sid)


# active_contour(r'images\apple.png', alpha, beta,
#                iterations, w_line, w_edge, radius)
