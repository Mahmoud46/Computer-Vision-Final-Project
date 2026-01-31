import numpy as np

def euclidean_distance(point1, point2):
    return np.linalg.norm(np.array(point1) - np.array(point2))


# def clusters_distance_2(cluster1, cluster2):
#     for point1 in cluster1:
#         for point2 in cluster2:
#             return min(euclidean_distance(point1, point2))


def clusters_distance(cluster1, cluster2):
    cluster1_center = np.average(cluster1, axis=0)
    cluster2_center = np.average(cluster2, axis=0)
    return euclidean_distance(cluster1_center, cluster2_center)