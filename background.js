chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "capture_screen") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) return;

      chrome.storage.local.get({ screenshots: [] }, (result) => {
        const updated = [...result.screenshots, { image: dataUrl, timestamp: Date.now() }];
        chrome.storage.local.set({ screenshots: updated });
      });
    });
  }
});