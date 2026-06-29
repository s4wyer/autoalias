const mql = window.matchMedia("(prefers-color-scheme: light)");

const updateIcon = (e) => {
  if (e.matches) {
    chrome.runtime.sendMessage({ action: "setLightModeIcon" });
  } else {
    chrome.runtime.sendMessage({ action: "setDarkModeIcon" });
  }
};

updateIcon(mql);

mql.addEventListener("change", updateIcon);
