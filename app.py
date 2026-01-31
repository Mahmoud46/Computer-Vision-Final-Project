from flask import Flask
from controllers.home import home_bp
from controllers.receive_hybrid import receive_hybrid_bp
from controllers.receive_img import receive_img_bp
from controllers.apply_filter import apply_filter_bp
from controllers.receive_histogram import receive_histogram_bp
from controllers.receive_distribution_curve import receive_distribution_curve_bp
from controllers.receive_rgb import receive_rgb_bp
from controllers.receive_cml_curve import receive_cml_curve_bp
from controllers.active_contour import active_contour_bp
from controllers.hough_transform import hough_transform_bp
from controllers.ssd_ncc_receive import ssd_ncc_receive_bp
from controllers.image_thresholding_segmentation import image_thresholding_segmentation_bp
from controllers.face_detection import face_detection_bp
from controllers.face_recognition import face_recognition_bp
from controllers.ping import ping_bp
from controllers.start_cleanup_thread import start_cleanup_thread_bp


app = Flask(__name__)


app.register_blueprint(home_bp)
app.register_blueprint(receive_hybrid_bp)
app.register_blueprint(receive_img_bp)
app.register_blueprint(apply_filter_bp)
app.register_blueprint(receive_histogram_bp)
app.register_blueprint(receive_distribution_curve_bp)
app.register_blueprint(receive_rgb_bp)
app.register_blueprint(receive_cml_curve_bp)
app.register_blueprint(active_contour_bp)
app.register_blueprint(hough_transform_bp)
app.register_blueprint(ssd_ncc_receive_bp)
app.register_blueprint(image_thresholding_segmentation_bp)
app.register_blueprint(face_detection_bp)
app.register_blueprint(ping_bp)
app.register_blueprint(start_cleanup_thread_bp)
app.register_blueprint(face_recognition_bp)


if __name__ == "__main__":
    app.run()