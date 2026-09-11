
# 📸 Lecture Screenshot to PDF Converter

A lightweight and efficient Chrome Extension designed for students and online learners. Capture important lecture slides or video moments instantly using a custom hotkey and generate a clean, sequential PDF document with a single click.

---

## ✨ Features

* **Custom Hotkey Selection:** Choose any key on your keyboard to trigger screenshots instantly.
* **Instant Capture:** Takes a screenshot of the visible tab without interrupting your video playback.
* **Smart PDF Generation:** Automatically detects screenshot resolutions and formats them into a clean PDF with zero margins/white spaces.
* **Sequential Ordering:** Captures and stores screenshots in chronological order.
* **Privacy Focused:** All screenshots are stored locally in your browser storage (`chrome.storage.local`) and processed offline.

---

## 📁 Project Structure

```text
chrome-extension/
├── manifest.json       # Extension blueprint & permissions configuration
├── popup.html          # Extension UI popup
├── popup.js            # UI logic, key handler & PDF compilation engine
├── content.js          # Webpage keydown listener
├── background.js       # Background tab capture service worker
├── README.md           # Documentation
└── lib/
    └── jspdf.umd.min.js # jsPDF library for offline PDF creation
