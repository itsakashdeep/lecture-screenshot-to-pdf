document.addEventListener("DOMContentLoaded", () => {
  const keyInput = document.getElementById("keyInput");
  const countStatus = document.getElementById("countStatus");

  // Saved key aur screenshot count load karein
  chrome.storage.local.get({ selectedKey: "s", screenshots: [] }, (data) => {
    keyInput.value = data.selectedKey;
    countStatus.textContent = `Screenshots: ${data.screenshots.length}`;
  });

  // User ki custom key save karein
  document.getElementById("saveKeyBtn").addEventListener("click", () => {
    const val = keyInput.value.trim().toLowerCase();
    if (val) {
      chrome.storage.local.set({ selectedKey: val }, () => {
        alert(`Screenshot key set to: '${val.toUpperCase()}'`);
      });
    }
  });

  // Dynamic Image Ratio ke sath PDF Generate aur Download karein
  document.getElementById("concludeBtn").addEventListener("click", () => {
    chrome.storage.local.get({ screenshots: [] }, async (result) => {
      if (result.screenshots.length === 0) {
        alert("Koi screenshot captured nahi hai!");
        return;
      }

      const { jsPDF } = window.jspdf;
      let pdf = null;

      for (let index = 0; index < result.screenshots.length; index++) {
        const item = result.screenshots[index];
        
        // Image dimensions calculate karne ke liye Image object banayein
        const img = new Image();
        img.src = item.image;
        await new Promise((resolve) => (img.onload = resolve));

        const imgWidth = img.width;
        const imgHeight = img.height;

        // Image ke hisab se orientation aur dynamic page size decide karein
        const orientation = imgWidth > imgHeight ? "l" : "p";
        
        if (index === 0) {
          // Pehla page screenshot ki dimensions par fit karein
          pdf = new jsPDF({
            orientation: orientation,
            unit: "px",
            format: [imgWidth, imgHeight]
          });
        } else {
          // Aage ke pages add karein exact image size ke sath
          pdf.addPage([imgWidth, imgHeight], orientation);
        }

        // Image ko bina kisi white margin ke pure page par fit karein
        pdf.addImage(item.image, "PNG", 0, 0, imgWidth, imgHeight);
      }

      pdf.save("lecture_notes.pdf");

      // Reset screenshots array
      chrome.storage.local.set({ screenshots: [] }, () => {
        countStatus.textContent = "Screenshots: 0";
      });
    });
  });
});