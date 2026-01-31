import { sendPing } from "./services/api.js";
import homeEvents from "./events/home_events.js";
import imagesMatchingEvents from "./events/images_matching_events.js";
import imageThresholdingEvents from "./events/image_thresholding_events.js";
import faceDetectionRecognitionEvents from "./events/face_detection_recogntion_events.js";

homeEvents();
imagesMatchingEvents();
imageThresholdingEvents();
faceDetectionRecognitionEvents()

// Send ping every 10 seconds
setInterval(sendPing, 10000);
