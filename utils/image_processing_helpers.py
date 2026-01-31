import numpy as np
import cv2
from scipy import ndimage
from nanoid import generate

# Convolution Function
def conv(img, krnl):
    '''This function makes 2d convolution as it takes two variable img => 2d array and krnl => array of the kernel
    and return the new array of the new image'''
    krnl_h, krnl_w = len(krnl), len(krnl[0])
    img_h, img_w = img.shape
    img_conv = np.zeros(img.shape)
    for i in range(krnl_h, img_h-krnl_h):
        for j in range(krnl_w, img_w-krnl_w):
            sum = 0
            for m in range(krnl_h):
                for n in range(krnl_w):
                    sum += krnl[m][n]*img[i-krnl_h+m][j-krnl_w+n]
            img_conv[i][j] = sum
    return img_conv

# Average Filter Kernel Generator
def generate_av_kernel(krnl_size):
    '''Generate the average kernel as it takes krnl_size => kernel size and returns kernel => kernel array'''
    kernel = []
    for i in range(krnl_size):
        row = []
        for j in range(krnl_size):
            row.append(1/krnl_size**2)
        kernel.append(row)
    return kernel

def fourier_transform(img):
   # make discrete fourier transform to the image
    dft = cv2.dft(np.float32(img), flags=cv2.DFT_COMPLEX_OUTPUT)

    # shift the origin from the top left to the origin so the low frequency be in the center
    dft_shift = np.fft.fftshift(dft)

    # extract the magnitude out of the complex number of the image
    # zero is real , 1 is imaginery part
    mag_spectrum = 20 * \
        np.log(cv2.magnitude(dft_shift[:, :, 0], dft_shift[:, :, 1]))

    return dft_shift

def inverse_fourier(masked_img):

    inshifted_img = np.fft.ifftshift(masked_img)

    # apply inverse fourier transform
    img_back = cv2.idft(inshifted_img)

    img_back = cv2.magnitude(img_back[:, :, 0], img_back[:, :, 1])

    return img_back


def fourier_domain_rgb(image, sigma):
    transformed_channels = []
    for i in range(3):
        input_ = np.fft.fft2((image[:, :, i]))
        result = ndimage.fourier_gaussian(input_, sigma)
        transformed_channels.append(np.fft.ifft2(result))

    final_image = np.dstack([transformed_channels[0].astype(int),
                             transformed_channels[1].astype(int),
                             transformed_channels[2].astype(int)])
    return final_image.real

def gaussian_in_fourier_domain(img, sigma):
    input_ = np.fft.fft2(img)
    result = ndimage.fourier_gaussian(input_, sigma)
    result = np.fft.ifft2(result)
    return result.real



def convert_to_gray_scale(img_path, sid):
    img = cv2.imread(img_path, 0)
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path, img)
    return img_path


def get_unique(arr):
    unique, count = np.unique(arr, return_counts=True)
    return [unique.tolist(), count.tolist()]


# Testing Counting Function unique img
def search_index(index, img):
    count = 0
    for i in range(len(img)):
        for j in range(len(img[0])):
            if img[i][j] == index:
                count += 1
    return count


def unique_img(img):
    unique_arr = np.zeros(256)
    for i in range(len(unique_arr)):
        unique_arr[i] = search_index(i, img)
    return unique_arr
