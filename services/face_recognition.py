import cv2
from scipy.spatial.distance import euclidean
from config.paths import FACES_DIR
from core.face_preprocessing import preprocess_face
from core.face_detection import detect_face
from utils.face_recognition_helpers import get_face
from config.paths import FACE_MODELS_DIR
import joblib


# Load Models
_pca = joblib.load(f"{FACE_MODELS_DIR}/pca_eigenfaces.pkl")
_lda = joblib.load(f"{FACE_MODELS_DIR}/lda_fisherface.pkl")
_svm = joblib.load(f"{FACE_MODELS_DIR}/svm_classifier.pkl")
_class_centroids = joblib.load(f"{FACE_MODELS_DIR}/class_centroids.pkl")
DIST_THRESHOLD = joblib.load(f"{FACE_MODELS_DIR}/distance_threshold.pkl")
_label_encoder = joblib.load(f"{FACE_MODELS_DIR}/label_encoder.pkl")

def apply_face_recognition(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return "", "Invalid image", ""

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    face = detect_face(gray)
    if face is None:
        return "", "No face detected", ""

    # Preprocess face
    face_flat = preprocess_face(face).reshape(1, -1)

    # PCA → LDA
    face_pca = _pca.transform(face_flat)
    face_lda = _lda.transform(face_pca)

    # SVM prediction (numeric label)
    predicted_id = _svm.predict(face_lda)[0]

    # Distance to class centroid
    centroid = _class_centroids[predicted_id]
    distance = euclidean(face_lda[0], centroid)

    # Open-set check
    if distance > DIST_THRESHOLD:
        return "", "Unknown person", ""
    else:
        # Decode numeric label to human-readable name
        predicted_label = _label_encoder.inverse_transform([predicted_id])[0]
        # print(predicted_label)
        face_date = get_face(predicted_label)
        # print(face_date)
        return f"{FACES_DIR}/{face_date['img']}", "Known person", face_date['name']