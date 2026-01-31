import cv2
from nanoid import generate
from core.image_segmentation import region_growing
import numpy as np
from core.agglomerative_clustering import AgglomerativeClustering

def apply_region_growing(img_path, seedx, seedy, sid):
    print(f'seedX={seedx}, seedY={seedy}')
    img = cv2.imread(img_path, 0)
    seed_points = [seedx, seedy]
    region_growing_img = region_growing(img, seed_points)
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
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
    
    img_path = f'./static/db/generated/{sid}/{generate()}.png'

    cv2.imwrite(img_path, new_img)
    return img_path
