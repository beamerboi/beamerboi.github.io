import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const publicFile = (name) => new URL(`../public/${name}`, import.meta.url);
const icon = await readFile(publicFile("favicon.svg"));
const banner = await readFile(publicFile("social-banner.svg"));

await writeFile(
  publicFile("social-banner.png"),
  await sharp(banner).png({ compressionLevel: 9 }).toBuffer(),
);

await writeFile(
  publicFile("apple-touch-icon.png"),
  await sharp(icon, { density: 288 })
    .resize(180, 180)
    .flatten({ background: "#fefefd" })
    .png()
    .toBuffer(),
);

// ICO supports multiple sizes, keeping the mark crisp in tabs and bookmarks.
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) =>
    sharp(icon, { density: 288 }).resize(size, size).png().toBuffer(),
  ),
);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(image.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(
  publicFile("favicon.ico"),
  Buffer.concat([directory, ...images]),
);
await writeFile(publicFile("favicon-32x32.png"), images[1]);
console.log("Created social banner, favicon sizes, and Apple touch icon.");
