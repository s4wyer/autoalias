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

importScripts("utils.js");

async function copyToClipboard(text) {
  try {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: [chrome.offscreen.Reason.CLIPBOARD],
      justification: 'Copy generated alias to clipboard'
    });
  } catch (err) {
    if (!err.message.includes('Only a single offscreen document may be created')) {
      console.error('Failed to create offscreen document', err);
      return;
    }
  }

  chrome.runtime.sendMessage({
    type: 'copy-data-to-clipboard',
    target: 'offscreen',
    data: text
  }, () => {
    chrome.offscreen.closeDocument();
  });
}

function showNotification(title, message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: title,
    message: message,
    silent: true
  });
}

chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-alias") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        const activeTab = tabs[0];
        try {
          const currentUrl = new URL(activeTab.url);
          const rootDomain = getRootDomain(currentUrl.hostname);

          chrome.storage.local.get(["savedAliasDomain"], (result) => {
            const aliasDomain = result.savedAliasDomain;
            if (aliasDomain && rootDomain) {
              const fullAlias = `${rootDomain}@${aliasDomain}`;
              copyToClipboard(fullAlias);
            } else {
              showNotification('AutoAlias', 'Error: No alias domain set. Please open the extension.');
            }
          });
        } catch (error) {
          console.error("Could not parse tab URL:", activeTab.url);
        }
      } else {
        showNotification('AutoAlias', 'Error: Cannot determine current active tab.');
      }
    });
  }
});

