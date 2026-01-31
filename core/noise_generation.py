import cv2
import numpy as np
from nanoid import generate
from random import random

'''Noises'''
# Gaussian Noise
def add_gaussian_noise(img_path, var, sid):
    '''This function takes two variable img_path => path of image and var => variance
    and return the path of the generated image'''
    img = cv2.imread(img_path)  # convert image into grayscale
    img = img/255   # normalize the image
    x, y, z = img.shape
    mean = 0
    sigma = np.sqrt(var)
    noise = np.random.normal(loc=mean, scale=sigma, size=(x, y, z))
    img_path = f'./static/db/generated/{sid}/{generate()}_gn_{var}.png'
    cv2.imwrite(img_path, (noise+img)*255)
    return img_path


# Salt and Pepper Noise
def add_salt_pepper_noise(img_path, pepper, sid):
    '''This function takes two variable img_path => path of image and pepper => the distribution of balck pixels in filter
    and return the path of the generated image'''
    image = cv2.imread(img_path)
    output = np.zeros(image.shape, dtype=np.uint8)
    salt = 1 - pepper
    for i in range(image.shape[0]):
        for j in range(image.shape[1]):
            rdn = random()
            if rdn < pepper:
                output[i][j] = 0
            elif rdn > salt:
                output[i][j] = 255
            else:
                output[i][j] = image[i][j]
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, output)
    return img_path


# Uniform noise
def add_uniform_noise(img_path, type, sid):
    '''This function takes two variable img_path => path of image and type => type of the image if it is gray or rgb 
    and return the path of the generated image'''
    img = cv2.imread(img_path)
    img = img/255
    if type == 'rgb':
        x, y, z = img.shape
    elif type == 'gray':
        x, y, _ = img.shape
    a = 0
    b = 1.1
    noise = np.zeros(img.shape, dtype=np.uint8)
    for i in range(x):
        for j in range(y):
            noise[i][j] = np.random.uniform(a, b)
    noise_img = img + noise
    noise_img = noise_img*255
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, noise_img)
    return img_path
