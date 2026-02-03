# Object Detection Dashboard – TensorFlow.js

A real-time object detection web application built with React and TensorFlow.js (Coco-SSD).
The app uses webcam input to detect multiple objects, draw bounding boxes, and display confidence scores — completely on the client side without any backend.



# Features

 Live webcam object detection

 Bounding boxes with class labels

 Confidence score filtering

 Optimized 5 FPS inference pipeline

 Canvas overlay visualization

 Runs fully in browser (no server required)

 WebGL backend for faster performance
# Tech Stack

React.js – UI

TensorFlow.js – ML in browser

Coco-SSD Model – Object detection

React Webcam – Camera stream

HTML Canvas – Drawing boxes

 # Installation
git clone <your-repo-url>
cd object-detection-dashboard-tfjs
npm install
npm run dev

Open: http://localhost:5173

# Optimizations
WebGL backend enabled

FPS limited to 5 for stability

Confidence threshold > 0.65

Small object noise removal

RequestAnimationFrame loop control

# Output

Live video feed

Green bounding boxes

Object name + confidence %

Detected objects list panel

# Contributing

Pull requests are welcome. For major changes, please open an issue first.

# Future Enhancements

Screenshot capture feature

Object count analytics

Alert for specific object

Image upload detection

Mobile responsive UI

Voice announcement

FPS control slider

Dark/Light theme

Custom model support