import cv2
import numpy as np
from nanoid import generate
from utils.image_processing_helpers import fourier_domain_rgb, fourier_transform, inverse_fourier, gaussian_in_fourier_domain



def HPF_gray(path):
    # read the image
    img = cv2.imread(path, 0)
    dft_shift = fourier_transform(img)
    '''HPF'''
    # To apply the HPF block the center region of image as remove the low frequncy
    rows, cols = img.shape
    # get the center of the rows and colums to make circle at the center
    crow, ccol = int(rows / 2), int(cols / 2)
    # creat array of ones to make a white image
    mask = (np.ones((rows, cols, 2), np.uint8))
    r = 2
    center = [crow, ccol]
    x, y = np.ogrid[:rows, :cols]
    # the equation of the circle
    mask_area = (x - center[0]) ** 2 + (y - center[1]) ** 2 <= r*r
    mask[mask_area] = 0
    # apply the mask to the dft_shift
    masked_img = dft_shift * mask
    # inverse fourier transform
    img_back = inverse_fourier(masked_img)

    return img_back


def LPF_gray(path):
    # read the image
    img = cv2.imread(path, 0)

    dft_shift = fourier_transform(img)

    '''LPF'''
    # LPF opposite of HPF fill the center with ones and create black image instead of white
    rows, cols = img.shape
    crow, ccol = int(rows / 2), int(cols / 2)
    mask = np.zeros((rows, cols, 2), np.uint8)
    r = 60
    center = [crow, ccol]
    x, y = np.ogrid[:rows, :cols]
    mask_area2 = (x - center[0]) ** 2 + (y - center[1]) ** 2 <= r*r
    mask[mask_area2] = 1

    # apply the mask(LPF) to the dft_shift
    masked_img = dft_shift * mask

    # inverse fourier transform
    img_back = inverse_fourier(masked_img)

    return img_back


def HPF_rgb(path, sid):
    img = cv2.imread(path)[:, :, ::-1]
    img = cv2.resize(img, (1000, 1000))
    img = img-fourier_domain_rgb(img, 9)
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img)
    return img_path


def LPF_rgb(path, sid):
    img = cv2.imread(path)[:, :, ::-1]
    img = cv2.resize(img, (1000, 1000))
    img = fourier_domain_rgb(img, 9)
    img = img[:, :, ::-1]
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img)
    return img_path


def hybrid_gray(img1, img2):

    gray_img1 = cv2.imread(img1, 0)
    gray_img2 = cv2.imread(img2, 0)

    gray_img1 = cv2.resize(gray_img1, dsize=(1000, 1000))
    gray_img2 = cv2.resize(gray_img2, dsize=(1000, 1000))

    gray_img1 = gaussian_in_fourier_domain(gray_img1, 15)

    gray_img2 = gray_img2 - gaussian_in_fourier_domain(gray_img2,  10)

    hybrid_image = gray_img2 + gray_img1

    return hybrid_image


def hybrid_rgb(img1_path, img2_path, sid):
    # sid => session id 
    # prepare img1
    img1 = cv2.imread(img1_path)
    img1 = img1[:, :, ::-1]
    img1 = cv2.resize(img1, (1000, 1000))
    # prepare img2
    img2 = cv2.imread(img2_path)
    img2 = img2[:, :, ::-1]
    img2 = cv2.resize(img2, (1000, 1000))

    img1 = fourier_domain_rgb(img1, 9)  # low pass filter img1
    img2 = img2 - fourier_domain_rgb(img2,  1000)  # high pass filter img1

    hybrid_image = img2+img1
    hybrid_image = hybrid_image[:, :, ::-1]

    img_path = f'./static/db/generated/{sid}/{generate()}.png'

    cv2.imwrite(img_path, hybrid_image)

    return img_path
