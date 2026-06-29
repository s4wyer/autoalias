const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = __dirname;
const distDir = path.join(rootDir, "dist");
const keyPath = path.join(rootDir, "key.pem");
const crxOutputPath = path.join(rootDir, "autoalias.crx");

console.log("Starting build pipeline...");

if (!fs.existsSync(keyPath)) {
  console.log("Private key (key.pem) not found. Generating a new one...");
  try {
    execSync(`npx crx keygen "${rootDir}"`, { stdio: "inherit" });
    console.log("Private key generated successfully at key.pem.");
  } catch (err) {
    console.error("Error generating private key:", err.message);
    process.exit(1);
  }
} else {
  console.log("Existing private key (key.pem) found.");
}

if (fs.existsSync(distDir)) {
  console.log("Cleaning existing dist directory...");
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

const assetsToCopy = [
  "manifest.json",
  "popup.html",
  "popup.css",
  "popup.js",
  "background.js",
  "toggleIcon.js",
  "icons",
];

console.log("Copying assets to dist folder...");
assetsToCopy.forEach((asset) => {
  const src = path.join(rootDir, asset);
  const dest = path.join(distDir, asset);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`- Copied ${asset}`);
  } else {
    console.warn(`- Warning: Asset ${asset} not found!`);
  }
});

console.log("Packaging extension into CRX...");
try {
  execSync(`npx crx pack "${distDir}" -p "${keyPath}" -o "${crxOutputPath}"`, {
    stdio: "inherit",
  });
  console.log(`Successfully built CRX at: ${crxOutputPath}`);
} catch (error) {
  console.error("Failed to pack CRX:", error.message);
  process.exit(1);
}
