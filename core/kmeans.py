import numpy as np
from scipy.spatial.distance import cdist

class KMeans():
    def __init__(self, n_clus, max_iter):
        self.n_clus = n_clus # Number of clusters
        self.centroids = None
        self.X = None
        self.clusters = None
        self.max_iter = max_iter


    def fit(self, X, init_state=None):
        Npts, Ndim = X.shape
        self.X = X
        
        if init_state is None:
            X_max, X_min = np.max(X), np.min(X)
            self.centroids = np.random.uniform(
                low=X_min, high=X_max, size=(self.n_clus, Ndim))
        else:
            self.centroids = init_state
            
        for _ in range(self.max_iter):
            # E-step: Assign pixels to the nearest centroid
            diff = cdist(X, self.centroids, metric="euclidean")
            self.clusters = np.argmin(diff, axis=1)
            
            # M-step: Update centroids
            for i in range(self.n_clus):
                # Find the indices of points assigned to this cluster
                indices = np.where(self.clusters == i)[0]
                
                if len(indices) > 0:
                    # Normal update: mean of all points in the cluster
                    self.centroids[i] = np.mean(X[indices], axis=0)
                else:
                    # FIX: If cluster is empty, re-initialize it to a random data point
                    # This prevents NaNs and keeps the cluster "alive"
                    self.centroids[i] = X[np.random.choice(Npts)]
        
    def get_centroids(self):
        return self.centroids
    
    def get_clusters(self):
        return self.clusters