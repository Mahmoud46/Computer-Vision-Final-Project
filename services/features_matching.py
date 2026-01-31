import cv2
import numpy as np
import time
from core.sift import SIFT
from utils.features_matching_helpers import draw_matches

def ncc_matching(keypoints_1, keypoints_2, desc1, desc2, threshold):

    matches = []

    for i in range(len(desc1)):
        for j in range(len(desc2)):
            out1_norm = (desc1[i] - np.mean(desc1[i])) / (np.std(desc1[i]))
            out2_norm = (desc2[j] - np.mean(desc2[j])) / (np.std(desc2[j]))
            corr_vector = np.multiply(out1_norm, out2_norm)
            corr = float(np.mean(corr_vector))
            if corr > threshold:
                matches.append([i, j, corr])

    final = []
    for i in range(len(matches)):
        dis = np.linalg.norm(np.array(
            keypoints_1[matches[i][0]].pt) - np.array(keypoints_2[matches[i][1]].pt))
        final.append(cv2.DMatch(matches[i][0], matches[i][1], dis))
    return final

def ssd_matching(keypoints_1, keypoints_2, desc1, desc2, threshold):

    matches = []
    for i in range(len(desc1)):
        for j in range(len(desc2)):
            ssd = np.sum(np.square(desc1[i]-desc2[j]))
            if ssd < threshold:
                matches.append([i, j, ssd])
    final = []
    for i in range(len(matches)):
        dis = np.linalg.norm(np.array(
            keypoints_1[matches[i][0]].pt) - np.array(keypoints_2[matches[i][1]].pt))
        final.append(cv2.DMatch(matches[i][0], matches[i][1], dis))
    return final

def features_matching(img_path1, img_path2, threshold, mode, sid):

    # read images
    img1 = cv2.imread(img_path1, 0)
    img2 = cv2.imread(img_path2, 0)

    # sift = cv2.SIFT_create()
    # keypoints_1, descriptors_1 = sift.detectAndCompute(img1, None)
    # keypoints_2, descriptors_2 = sift.detectAndCompute(img2, None)

    # sift = cv2.SIFT_create()
    # keypoints_1, descriptors_1 = sift.detectAndCompute(img1, None)
    # keypoints_2, descriptors_2 = sift.detectAndCompute(img2, None)
    sift1 = SIFT(img_path1)
    keypoints_1, descriptors_1 = sift1.computeKeypointsAndDescriptors()
    sift_time_st = time.time()
    sift2 = SIFT(img_path2)
    keypoints_2, descriptors_2 = sift2.computeKeypointsAndDescriptors()
    sift_time_end = time.time()
    sift_total_time = sift_time_end-sift_time_st
    if mode == 'ssd':
        print("ssd")
        start = time.time()
        matches = ssd_matching(keypoints_1, keypoints_2,
                               descriptors_1, descriptors_2, threshold)
        end = time.time()
        total_time = end-start

    elif mode == 'ncc':
        print("ncc")
        start = time.time()
        matches = ncc_matching(keypoints_1, keypoints_2,
                               descriptors_1, descriptors_2, threshold)
        end = time.time()
        total_time = end-start
    new_path = draw_matches(img1, keypoints_1, img2, keypoints_2, matches[:10], sid)
    print(total_time)
    return total_time, new_path, sift_total_time


# feature_matching("images\cat256.jpg", "images\cat512.png", 0.93, "ncc")
