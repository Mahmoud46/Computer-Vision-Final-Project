# Pixel – Computer Vision Tools and Analysis Platform

Pixel is a comprehensive **computer vision application** developed as a **final project for the Computer Vision course** in the **Department of Systems and Biomedical Engineering, Faculty of Engineering, Cairo University**. The project provides an interactive environment for applying, visualizing, and analyzing a wide range of classical and advanced computer vision techniques.

The platform bridges the gap between theoretical computer vision concepts and practical implementation by enabling hands-on experimentation with real image data.

---

## Project Overview

Pixel integrates multiple image processing and computer vision algorithms into a single, unified web-based application. Users can apply various techniques to input images and immediately observe their effects, making the platform particularly valuable for learning, experimentation, and academic demonstration.

The project emphasizes correctness of implementation, modular design, and clarity of results while maintaining an intuitive and accessible user interface.

---

## Core Functionalities

### Image Processing

- Noise generation:
  - Uniform noise
  - Gaussian noise
  - Salt & Pepper noise
- Noise reduction filters:
  - Average filter
  - Gaussian filter
  - Median filter
- Edge detection algorithms:
  - Sobel
  - Prewitt
  - Roberts
  - Canny
- Histogram operations:
  - Histogram computation
  - Histogram normalization
  - Histogram equalization

---

### Object Detection

- Hough Transform for parametric shape detection:
  - Line detection
  - Circle detection
  - Ellipse detection
- Active Contour Models (Snakes) for semi-supervised object segmentation

---

### Image Matching

- Feature-based image matching techniques:
  - Scale-Invariant Feature Transform (SIFT)
  - Sum of Squared Differences (SSD)
  - Normalized Cross-Correlation (NCC)

---

### Image Thresholding and Segmentation

- Global thresholding techniques:
  - Otsu’s thresholding
  - Optimal thresholding
- Local thresholding
- Spectral thresholding
- Region-based segmentation:
  - Region growing
  - Agglomerative clustering

---

### Face Detection and Recognition

The face detection and recognition module is based on a **Principal Component Analysis (PCA)–based face recognition model** developed as a standalone project and integrated into the Pixel platform.

The model follows the classical **Eigenfaces approach**, where facial images are projected into a lower-dimensional subspace that preserves the most significant variance among faces. Recognition is performed by comparing feature embeddings within the PCA space.

The implementation includes:

- Face detection and preprocessing
- Grayscale conversion and normalization
- Image resizing and alignment
- PCA-based dimensionality reduction
- Eigenface extraction
- Feature-space similarity comparison for recognition

The complete development details, training pipeline, and evaluation of the face recognition model are available in the following repository:

🔗 **Face Recognition PCA Model Repository**  
https://github.com/Mahmoud46/CV-Face-Recognition-PCA-Model-Development

This modular architecture allows the face recognition component to be maintained, evaluated, and extended independently from the main Pixel application.

---

## Objectives

- Demonstrate practical implementation of classical computer vision algorithms
- Provide an interactive learning platform for image analysis techniques
- Enable visualization and comparison of algorithmic results
- Integrate multiple computer vision methodologies into a cohesive system

---

## Technologies and Concepts

- Image processing and feature extraction
- Classical computer vision algorithms
- Mathematical modeling and signal analysis
- PCA and dimensionality reduction
- Web-based visualization and interaction

---

## Live Demonstration

The application is fully demonstrated at:  
🔗 https://mahmoud46.github.io/pixel/

---

## Project Team

- **[Mahmoud Zakaria](https://www.linkedin.com/in/mahmoud-zakaria-9a9a11304/)** – Senior Biomedical Engineering Student
- **[Yasmin Yasser](https://www.linkedin.com/in/yasmin-yasser-92ba09235/)** – Senior Biomedical Engineering Student
- **[Aisha Waziry](https://www.linkedin.com/in/aisha-waziry-330592212/)** – Senior Biomedical Engineering Student

---

## Academic Context

This project was developed as a **final course project** for the Computer Vision curriculum within the Systems and Biomedical Engineering program at **Cairo University**. The work reflects the application of both foundational and advanced computer vision techniques covered during the course.

---

## Project Structure

```bash
project-root/
├── config/
|   ├── paths.py
|   └── settings.py
├── controllers/
├── core/
├── services/
├── db/
|   ├── faces.json
|   └── sessions.json
├── static/
|   ├── assets/
|   ├── css/
|   |   ├── animations/
|   |   ├── components/
|   |   └── style.css
|   ├── db/
|   |   ├── faces/
|   |   ├── images/
|   |   ├── generated/
|   |   └── upload/
|   ├── js/
|   |   ├── components/
|   |   ├── events/
|   |   ├── services/
|   |   ├── utils/
|   |   └── script.js
|   ├── models/
|   └── public/
├── templates/         # HTML templates
├── utils/
├── app.py             # Flask application entry point
└── requirements.txt   # Python dependencies
```

---

## Getting Started

### Prerequisites

- Python 3.9 or higher
- pip (included with Python)

### Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/Computer-Vision-Final-Project.git
```

2. Navigate to the project directory

```bash
cd Computer-Vision-Final-Project
```

3. Create and activate a virtual environment

```bash
python -m venv venv
venv\Scripts\activate    # On macOS / Linux: source venv/bin/activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Run the Flask server

```bash
flask run
```

---

## License and Copyright

© **May 2023 Pixel Project Team**  
All rights reserved.

This project is intended strictly for **academic and educational purposes**.  
Unauthorized reproduction, modification, distribution, or commercial use of any part of this project is prohibited without prior written permission from the authors.

---

**Pixel** — A practical platform for exploring and analyzing computer vision techniques.
