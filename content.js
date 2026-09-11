document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement.tagName;
  if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

  chrome.storage.local.get({ selectedKey: "s" }, (data) => {
    if (event.key.toLowerCase() === data.selectedKey.toLowerCase()) {
      chrome.runtime.sendMessage({ action: "capture_screen" });
    }
  });
});