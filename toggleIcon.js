const mql = window.matchMedia("(prefers-color-scheme: light)");

const updateIcon = (e) => {
  if (e.matches) {
    chrome.runtime.sendMessage({ action: "setLightModeIcon" });
  } else {
    chrome.runtime.sendMessage({ action: "setDarkModeIcon" });
  }
};

// Initial check
updateIcon(mql);

// Listen for changes
mql.addEventListener("change", updateIcon);
