import numpy as np
import cv2
from config.paths import EYE_CASCADE_PATH

_eye_cascade = cv2.CascadeClassifier(EYE_CASCADE_PATH)

def align_face(face_gray):
    eyes = _eye_cascade.detectMultiScale(
        face_gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(15, 15)
    )

    if len(eyes) < 2:
        return face_gray  # fallback

    eyes = sorted(eyes, key=lambda e: e[2], reverse=True)[:2]

    (x1, y1, w1, h1) = eyes[0]
    (x2, y2, w2, h2) = eyes[1]

    eye_center_1 = (x1 + w1 // 2, y1 + h1 // 2)
    eye_center_2 = (x2 + w2 // 2, y2 + h2 // 2)

    if eye_center_1[0] > eye_center_2[0]:
        eye_center_1, eye_center_2 = eye_center_2, eye_center_1

    dx = eye_center_2[0] - eye_center_1[0]
    dy = eye_center_2[1] - eye_center_1[1]
    angle = np.degrees(np.arctan2(dy, dx))

    h, w = face_gray.shape
    center = (int(w // 2), int(h // 2))

    rot_mat = cv2.getRotationMatrix2D(center, angle, 1.0)
    aligned = cv2.warpAffine(face_gray, rot_mat, (w, h))

    return aligned
