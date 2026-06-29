chrome.runtime.onMessage.addListener(handleMessages);

function handleMessages(message, sender, sendResponse) {
  if (message.target !== 'offscreen') {
    return false;
  }

  if (message.type === 'copy-data-to-clipboard') {
    const textEl = document.getElementById('copy-area');
    textEl.value = message.data;
    textEl.select();
    document.execCommand('copy');
    sendResponse({ success: true });
  }
}
