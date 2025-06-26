let resolveReady: any;
const docReady = new Promise(resolve => resolveReady = resolve);

if(document.readyState === "complete") {
  // Fully loaded!
  resolveReady();
}
else if(document.readyState === "interactive") {
  // DOM ready! Images, frames, and other subresources are still downloading.
  resolveReady()
}
else {
  // Loading still in progress.
  // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.

  window.addEventListener("DOMContentLoaded", () => {
      // DOM ready! Images, frames, and other subresources are still downloading.
      resolveReady();
  });

  window.addEventListener("load", () => {
      // Fully loaded!
      resolveReady();
  });
}

export default () => docReady;