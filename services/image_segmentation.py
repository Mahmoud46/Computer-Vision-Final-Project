import cv2
from nanoid import generate
from core.image_segmentation import region_growing, rgb_to_luv
import numpy as np
from core.agglomerative_clustering import AgglomerativeClustering
from config.paths import BASE_GENERATED_DIR
from sklearn.cluster import MeanShift, estimate_bandwidth
from core.kmeans import KMeans

def apply_region_growing(img_path, seedx, seedy, sid):
    print(f'seedX={seedx}, seedY={seedy}')
    img = cv2.imread(img_path, 0)
    seed_points = [seedx, seedy]
    region_growing_img = region_growing(img, seed_points)
    img_path = f"{BASE_GENERATED_DIR}/{sid}/{generate()}.png"
    cv2.imwrite(img_path, region_growing_img)
    return img_path


def apply_agglomerative_clustering(img_path, n_clusters, initial_k, sid):
    img = cv2.imread(img_path)[:, :, ::-1]
    img_shaped = img.reshape((-1, 3))
    print(f'N clust= {n_clusters}, K initial={initial_k}')
    
    Agglo = AgglomerativeClustering(n_clusters, initial_k)

    Agglo.fit(img_shaped)

    new_img = [[Agglo.predict_center(list(pixel))
                for pixel in row] for row in img]
    new_img = np.array(new_img, np.uint8)
    new_img = new_img[:, :, ::-1]
    
    img_path = f"{BASE_GENERATED_DIR}/{sid}/{generate()}.png"

    cv2.imwrite(img_path, new_img)
    return img_path

def apply_kmeans_clustering(img_path, n_clus, max_iter, sid):
    image = cv2.imread(convert_rgb_luv(img_path, sid)) # Read image
    X = image.reshape((-1, 3)) # Reshape to (Npts, Ndim = 3)
    X = np.float32(X)
    
    # Class the KMean class
    km = KMeans(n_clus, max_iter)
    km.fit(X)
    centers = km.get_centroids()
    clusters = km.get_clusters()
    
    segmented_image = centers[clusters]
    segmented_image = segmented_image.reshape((image.shape))
    
    img_path = f"{BASE_GENERATED_DIR}/{sid}/{generate()}.png"

    cv2.imwrite(img_path, segmented_image)
    return img_path

def convert_rgb_luv(img_path, sid):
    rgb_image = cv2.imread(img_path)

    r, g, b = cv2.split(rgb_image)

    l, u, v = rgb_to_luv(r / 50, g / 13, b / 40)

    luv = cv2.merge((l, u, v))

    img_path = f"{BASE_GENERATED_DIR}/{sid}/{generate()}.png"
    cv2.imwrite(img_path, luv)

    return img_path


def apply_mean_shift(img_path, sid):
    # read image and convert color domain
    # Original image used a custom module; replaced with standard OpenCV LUV conversion
    img = cv2.imread(convert_rgb_luv(img_path, sid))
    if img is None:
        raise FileNotFoundError(f"Could not load image at {img_path}")
    # img = cv2.cvtColor(img, cv2.COLOR_BGR2LUV)

    # filter to reduce noise
    img = cv2.medianBlur(img, 3)

    # flatten the image
    flat_image = img.reshape((-1, 3))
    flat_image = np.float32(flat_image)

    # meanshift
    bandwidth = estimate_bandwidth(flat_image, quantile=0.06, n_samples=3000)
    ms = MeanShift(bandwidth=bandwidth, bin_seeding=True, max_iter=800)
    ms.fit(flat_image)
    labeled = ms.labels_

    # get number of segments
    segments = np.unique(labeled)

    # get the average color of each segment
    total = np.zeros((segments.shape[0], 3), dtype=float)
    count = np.zeros(total.shape, dtype=float)
    
    for i, label in enumerate(labeled):
        total[label] = total[label] + flat_image[i]
        count[label] += 1
        
    avg = total / count
    avg = np.uint8(avg)

    # cast the labeled image into the corresponding average color
    res = avg[labeled]
    result = res.reshape((img.shape))
    
    # Optional: Convert back to BGR for standard viewing
    # result = cv2.cvtColor(result, cv2.COLOR_LUV2BGR)
    
    img_path = f"{BASE_GENERATED_DIR}/{sid}/{generate()}.png"
    cv2.imwrite(img_path, result)
    
    return img_path