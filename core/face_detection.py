import cv2
from config.paths import FACE_CASCADE_PATH

_face_cascade = cv2.CascadeClassifier(FACE_CASCADE_PATH)

def detect_face(img, min_neighbor=None, min_size=None):
    if min_neighbor and min_size:
        # Apply on normal image
        faces = _face_cascade.detectMultiScale(img, minNeighbors=min_neighbor, minSize=[min_size, min_size])

        # Draw rectangles on each face
        for x,y,h,w in faces:
            cv2.rectangle(img,(x,y),(x+w,(y+h)),(255,0,0),3)
        return img
    
    # Apply on gray image
    faces = _face_cascade.detectMultiScale(
        img,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(50, 50)
    )

    if len(faces) == 0:
        return None

    # Largest face
    x, y, w, h = max(faces, key=lambda f: f[2] * f[3])
    return img[y:y+h, x:x+w]
