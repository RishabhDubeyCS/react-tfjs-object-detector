# Vision AI | Real-time Object Detection

A high-performance, production-ready object detection dashboard built with **React 19**, **Vite**, and **TensorFlow.js**. This application leverages the **COCO-SSD** model to identify and track 80+ classes of objects directly in the browser with zero backend dependency.

![React](https://img.shields.io/badge/react-%2320232d.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TensorFlow](https://img.shields.io/badge/TensorFlow.js-%23FF6F00.svg?style=for-the-badge&logo=tensorflow&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Key Features

- **Real-time Inference:** Client-side object detection using WebGL acceleration.
- **High Accuracy Mode:** Optimized using the `mobilenet_v2` base model for superior precision over standard lite models.
- **Smart Filtering:** Built-in confidence thresholding (60%+) to eliminate false positives and "ghost" detections.
- **Dynamic Visuals:** Real-time HTML5 Canvas overlays with auto-scaling bounding boxes and class labels.
- **Live Feed Dashboard:** Integrated sidebar showing a real-time list of detected objects and their confidence scores.
- **Responsive Dark Theme:** Modern, polished UI with "System Active" status indicators and loading states.
- **Robust Error Handling:** Graceful fallbacks for camera permission denials and model loading failures.

## 🛠️ Tech Stack

- **Frontend:** React 19 (Hooks, Functional Components)
- **Machine Learning:** TensorFlow.js (`@tensorflow/tfjs`)
- **Model:** COCO-SSD (`@tensorflow-models/coco-ssd`) with `mobilenet_v2`
- **Video Stream:** `react-webcam`
- **Build Tool:** Vite (Ultra-fast HMR and production bundling)
- **Styling:** Custom CSS3 with Flexbox/Grid and Glassmorphism effects

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-tfjs-object-detector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🧠 Model Optimizations

To ensure this application is "Production Ready," the following architectural choices were made:

- **Accuracy vs. Speed:** Switched the COCO-SSD base from `lite_mobilenet_v2` to `mobilenet_v2`. While slightly more resource-intensive, it provides significantly better detection for smaller objects and overlapping subjects.
- **Confidence Tuning:** Hardcoded a `0.60` confidence floor. This ensures the UI only displays objects that the neural network is highly certain about, providing a much cleaner user experience.
- **Loop Management:** Implemented `requestAnimationFrame` with a strict cleanup pattern in `useObjectDetector` hook to prevent memory leaks and ensure stable 30-60 FPS performance depending on hardware.

## 📂 Project Structure

```text
src/
├── components/
│   ├── PredictionList.jsx   # Sidebar list of detected objects
│   └── ...
├── hooks/
│   └── useObjectDetector.js # Custom hook managing TFJS lifecycle
├── utils/
│   └── drawUtils.js         # Canvas drawing logic for boxes/labels
├── App.jsx                  # Main dashboard orchestration
├── App.css                  # Modern dark-theme styles
└── main.jsx                 # React entry point
```

## 🎓 Interview Highlights (Cheat Sheet)

If asked about this project in a technical interview, here are the key talking points:

- **"Why TensorFlow.js?"** -> It allows for **private, local inference**. No user data/video ever leaves the browser, ensuring 100% privacy and zero server costs.
- **"How is the UI kept smooth during heavy ML tasks?"** -> I used `requestAnimationFrame` for the detection loop and optimized the `mobilenet_v2` loading to happen asynchronously on mount, preventing main-thread blocking.
- **"How did you handle responsiveness?"** -> The application uses a Flexbox-based dashboard layout that adjusts the viewfinder and sidebar based on screen real-estate, with a dedicated overlay canvas for the bounding boxes.
- **"What was a major challenge?"** -> Managing the `requestAnimationFrame` loop in React's lifecycle. I solved this by using `useRef` to store the request ID and ensuring a clean `cancelAnimationFrame` on unmount.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
