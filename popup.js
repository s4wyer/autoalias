const aliasName = document.getElementById("alias-name");
const aliasDomain = document.getElementById("alias-domain");
const result = document.getElementById("result");
const copyButton = document.getElementById("copy");

const getRootDomain = (hostname) => {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;

  // keep common multi-part TLDs (.co.uk, .com.au, etc.)
  const secondToLast = parts[parts.length - 2];
  const specialSLDs = ["co", "com", "org", "net", "edu", "gov", "ac", "mil"];

  if (specialSLDs.includes(secondToLast)) {
    return parts.slice(-3).join(".");
  }

  return parts.slice(-2).join(".");
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length > 0 && tabs[0].url) {
    try {
      const currentUrl = new URL(tabs[0].url);

      const rootDomain = getRootDomain(currentUrl.hostname);

      aliasName.value = rootDomain;
      chrome.storage.local.get(["savedAliasDomain"], (result) => {
        if (result.savedAliasDomain) {
          aliasDomain.value = result.savedAliasDomain;
        }
        updateResult();
      });
    } catch (error) {
      console.error("Could not parse tab URL:", tabs[0].url);
    }
  }
});

const getAliasDomain = () => {
  return aliasDomain.value.trim();
};

const updateResult = () => {
  const alias = getAliasDomain();
  const current = aliasName.value.trim();
  if (!current || !alias) {
    result.value = "";
    return;
  }
  result.value = `${current}@${alias}`;
};

aliasDomain.addEventListener("input", () => {
  updateResult();
  chrome.storage.local.set({ savedAliasDomain: aliasDomain.value });
});
aliasName.addEventListener("input", updateResult);

copyButton.addEventListener("click", async () => {
  if (!result.value) return;
  await navigator.clipboard.writeText(result.value);
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 1200);
});

updateResult();
