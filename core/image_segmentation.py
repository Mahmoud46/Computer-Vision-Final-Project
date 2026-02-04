import numpy as np

def region_growing(img, seed):
    row, col = np.shape(img)
    region_grow = np.zeros((row+1, col+1))
    # seeds point should be inverted since seed[1] is the x coordinate and seed[0] is the y coordinate
    swap = [seed[1], seed[0]]
    region_grow[swap[0]][swap[1]] = 255
    region_points = [[swap[0], swap[1]]]
    # the window of 8 pixels that we take around each point
    x_k = [-1, 0, 1, -1, 1, -1, 0, 1]
    y_k = [-1, -1, -1, 0, 0, 1, 1, 1]
    c = 0
    while len(region_points) > 0:

        if c == 0:
            check_point = region_points.pop(0)
            i = check_point[0]
            j = check_point[1]

        intensity = img[i][j]
        low = intensity - 8
        high = intensity + 8

        for k in range(8):
            if region_grow[i + x_k[k]][j + y_k[k]] != 255:
                try:
                    if low < img[i + x_k[k]][j + y_k[k]] < high:
                        region_grow[i + x_k[k]][j + y_k[k]] = 255
                        region_points.append([i + x_k[k], j + y_k[k]])
                    else:
                        region_grow[i + x_k[k]][j + y_k[k]] = 0
                except IndexError:
                    continue
        # we remove the point the was checked and make i and j takes the values for the next point
        check_point = region_points.pop(0)
        i = check_point[0]
        j = check_point[1]
        c = c + 1
    return region_grow

def rgb_to_luv(r, g, b):
    # Convert RGB values to XYZ color space
    x = r * 0.412453 + g * 0.357580 + b * 0.180423
    y = r * 0.212671 + g * 0.715160 + b * 0.072169
    z = r * 0.019334 + g * 0.119193 + b * 0.950227

    # Convert XYZ values to LUV color space
    x_ref = 0.95047
    y_ref = 1.00000
    z_ref = 1.08883

    u_ref = (4 * x_ref) / (x_ref + (15 * y_ref) + (3 * z_ref))
    v_ref = (9 * y_ref) / (x_ref + (15 * y_ref) + (3 * z_ref))

    u_prime = (4 * x) / (x + (15 * y) + (3 * z))
    v_prime = (9 * y) / (x + (15 * y) + (3 * z))

    l = (116 * ((y / y_ref) ** (1 / 3))) - 16
    u = 13 * l * (u_prime - u_ref)
    v = 13 * l * (v_prime - v_ref)

    return l, u, v