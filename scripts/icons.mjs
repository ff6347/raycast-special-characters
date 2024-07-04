//@ts-check
import { createCanvas } from "canvas";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * @typedef {Object} CharacterItem
 * @property {string} title - The title of the item
 * @property {string} subtitle - The Unicode subtitle of the item
 * @property {Object} icon - The icon information
 * @property {string} icon.path - Path to the icon image
 * @property {string} arg - The character or symbol
 * @property {Object} text - Text copy information
 * @property {string} text.copy - The text to copy
 * @property {Object} mods - Modifier keys and their actions
 * @property {Object} mods.alt - Alternate action with the alt key
 * @property {boolean} mods.alt.valid - Whether the alt key action is valid
 * @property {string} mods.alt.arg - Argument for the alt key action
 * @property {string} mods.alt.subtitle - Subtitle for the alt key action
 * @property {Object} mods.cmd - Alternate action with the cmd key
 * @property {boolean} mods.cmd.valid - Whether the cmd key action is valid
 * @property {string} mods.cmd.arg - Argument for the cmd key action
 * @property {string} mods.cmd.subtitle - Subtitle for the cmd key action
 */

// Load JSON data
/**
 *
 * @param {string} filePath The path to the JSON file
 * @returns {Promise<{items: CharacterItem[]}>} The parsed JSON data
 */
const loadJSON = async (filePath) => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

// Generate PNGs from JSON data
/**
 *
 * @param {{items: CharacterItem[]}} data The JSON data
 * @param {string} outPath The output directory path
 */
const generatePNGs = async (data, outPath) => {
  const items = data.items;

  for (const item of items) {
    const title = item.subtitle;
    const arg = item.arg;

    // Create a 32x32 canvas
    const canvas = createCanvas(32, 32);
    const context = canvas.getContext("2d");

    // Fill background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    context.fillStyle = "black";
    context.font = "20px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Draw the text (arg) at the center
    context.fillText(arg, canvas.width / 2, canvas.height / 2);

    // Save the canvas as a PNG file
    const buffer = canvas.toBuffer("image/png");
    const fileOutputPath = path.join(outPath, `${title}.png`);
    await fs.writeFile(fileOutputPath, buffer);
    console.log(`Created: ${fileOutputPath}`);
  }
};

// Main function
const main = async () => {
  const sourcePath = path.resolve(import.meta.dirname, "../src/data/characters.json");
  // check if file exists
  try {
    await fs.access(sourcePath);
  } catch (error) {
    console.error(`File not found: ${sourcePath}`);
    process.exit(1);
  }

  const outputDir = path.resolve(import.meta.dirname, "../assets");
  try {
    await fs.access(outputDir);
  } catch (error) {
    await fs.mkdir(outputDir);
  }

  const jsonData = await loadJSON(sourcePath);
  await generatePNGs(jsonData, outputDir);
};

main().catch(console.error);
