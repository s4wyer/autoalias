# AutoAlias

A browser extension to generate email aliases using the current domain.

![](https://github.com/s4wyer/autoalias/raw/main/assets/screenshot.png)

## Installation

### CRX (recomended)
1. Go to the [releases](https://github.com/s4wyer/autoalias/releases/latest) and download the latest `autoalias.crx` by right clicking and selecting "Save link as...".
2. Open go to `chrome://extensions`.
3. Enable "Developer mode".
4. Drag and drop the `autoalias.crx` file anywhere on the page.

### Unpacked Extension 
1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable "Developer mode" in the top right.
4. Click "Load unpacked" and select the `dist` folder (after running the build).

### Building & Packaging from Source
```bash
npm install
npm run build
```
