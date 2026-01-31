from utils.agglomerative_clustering_helpers import euclidean_distance, clusters_distance
import numpy as np

class AgglomerativeClustering:
    def __init__(self, k, initial_k):
        self.k = k
        self.initial_k = initial_k
        
    def initial_clusters(self, points):
        groups = {}
        d = int(256 / (self.initial_k))
        for i in range(self.initial_k):
            j = i * d
            groups[(j, j, j)] = []
        for i, p in enumerate(points):
            group = min(groups.keys(), key=lambda c: euclidean_distance(p, c))
            groups[group].append(p)
        return [g for g in groups.values() if len(g) > 0]
    
    def fit(self, points):
        # initially, assign each point to a distinct cluster
        self.clusters_list = self.initial_clusters(points)

        while len(self.clusters_list) > self.k:

            # Find the closest pair of clusters
            cluster1, cluster2 = min([(c1, c2) for i, c1 in enumerate(self.clusters_list) for c2 in self.clusters_list[:i]],
                                     key=lambda c: clusters_distance(c[0], c[1]))

            # Remove the two clusters from the clusters list
            self.clusters_list = [
                c for c in self.clusters_list if c != cluster1 and c != cluster2]

            # collect the two clusters
            merged_cluster = cluster1 + cluster2

            # Add the clusters list
            self.clusters_list.append(merged_cluster)

        self.cluster = {}
        for cl_num, cl in enumerate(self.clusters_list):
            for point in cl:
                self.cluster[tuple(point)] = cl_num

        self.centers = {}
        for cl_num, cl in enumerate(self.clusters_list):
            self.centers[cl_num] = np.average(cl, axis=0)

    def predict_cluster(self, point):

        return self.cluster[tuple(point)]

    def predict_center(self, point):

        point_cluster_num = self.predict_cluster(point)
        center = self.centers[point_cluster_num]
        return center

