chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setLightModeIcon") {
    chrome.action.setIcon({
      path: {
        "16": "icons/icon16-black.png",
        "48": "icons/icon48-black.png",
        "128": "icons/icon128-black.png",
      },
    });
  } else if (message.action === "setDarkModeIcon") {
    chrome.action.setIcon({
      path: {
        "16": "icons/icon16.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png",
      },
    });
  }
});
