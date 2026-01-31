import cv2
from nanoid import generate
import time
import numpy as np
from config.settings import MAX_IDLE_BETWEEN_TWO_PING_REQUESTS
from utils.sessions_helpers import get_sessions, save_sessions_data

def modify_path(path):
    new_path = './'+'/'.join(path.split('/')[3::])
    return new_path

def save(img_path, sid):
    # To save a choosen image from the system 
    upld_img_file = f'./static/db/upload/{sid}/{generate()}.png'
    cv2.imwrite(upld_img_file, cv2.imread(img_path))
    return upld_img_file


def to_uint8(img):
    """
    Convert any image (float or int) to uint8 safely for saving.
    """
    if img.dtype == np.uint8:
        return img

    if img.max() <= 1.0:
        # normalized image (0–1)
        return (img * 255).clip(0, 255).astype(np.uint8)

    # image already in 0–255 but float
    return img.clip(0, 255).astype(np.uint8)

# def cleanup_sessions_folders(sid):
#     """
#     Deletes the upload and generated folders for a given session id (sid)
#     """
#     upload_folder = os.path.join(BASE_UPLOAD, sid)
#     generated_folder = os.path.join(BASE_GENERATED, sid)

#     for folder in [upload_folder, generated_folder]:
#         if os.path.exists(folder) and os.path.isdir(folder):
#             try:
#                 shutil.rmtree(folder)
#                 print(f"Deleted folder: {folder}")
#             except Exception as e:
#                 print(f"Failed to delete {folder}: {e}")
#         else:
#             print(f"Folder does not exist, skipping: {folder}")

def cleanup_sessions():
    while True:
        now = time.time()
        sessions = get_sessions()

        expired_sids = []

        for sid, last_seen in sessions.items():
            try:
                if now - float(last_seen) > MAX_IDLE_BETWEEN_TWO_PING_REQUESTS:
                    expired_sids.append(sid)
            except (TypeError, ValueError):
                # Invalid timestamp → remove session
                expired_sids.append(sid)


        if expired_sids:
            for sid in expired_sids:
                sessions.pop(sid, None)
                print(f"Cleaned up session {sid}")
            save_sessions_data(sessions)
            

        time.sleep(10)  # run every 10 seconds

