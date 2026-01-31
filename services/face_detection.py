import cv2
from nanoid import generate
from core.face_detection import detect_face

def apply_face_detection(img_path, min_neighbor, min_size, sid):
    img = cv2.imread(img_path)
    img = detect_face(img, min_neighbor, min_size)
       
    img_path = f'./static/db/generated/{sid}/{generate()}.png'
    cv2.imwrite(img_path,img) 
    return img_path