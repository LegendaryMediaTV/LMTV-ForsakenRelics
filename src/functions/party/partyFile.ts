import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Static path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../../data/party.json");

/**
 * Reads the party data from the JSON file.
 * @returns {Promise<any>} Parsed party data.
 * @throws {Error} If there is an issue reading the file.
 */
export const readPartyFile = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    throw new Error("Error reading party data file.");
  }
};

/**
 * Writes updated data to the party JSON file.
 * @param {object} data - The updated party data to write.
 * @returns {Promise<void>}
 * @throws {Error} If there is an issue writing to the file.
 */
export const writePartyFile = async (data: object) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    throw new Error("Error writing party data file.");
  }
};
