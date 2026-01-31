import numpy as np
import cv2
from core.face_alignment import align_face
from config.settings import FACE_IMG_SIZE

def apply_clahe(face):
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    # CLAHE expects uint8
    if face.dtype != np.uint8:
        face = cv2.normalize(face, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
    face = clahe.apply(face)
    return face

def normalize_face(face, size):
    face = cv2.resize(face, size)
    face = apply_clahe(face)
    # Normalize to [0,1]
    face = face.astype(np.float32) / 255.0
    return face 

def vectorize_face(face):
    return face.flatten()

def preprocess_face(face):
    """
    Align → Resize → CLAHE → Normalize → Flatten
    """
    face = align_face(face)
    
    face = normalize_face(face, FACE_IMG_SIZE)
    
    face_vec = vectorize_face(face)

    return face_vec
