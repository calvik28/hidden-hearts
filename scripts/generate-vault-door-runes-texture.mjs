import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import OpenAI from "openai";

const MODEL = "gpt-image-2";
const OUTPUT_FORMAT = "png";
const SIZE = "1536x1024";
const QUALITY = "medium";
const PROMPT = `Create a seamless or near-seamless fantasy vault door texture for Hidden Hearts RPG. The texture should show ancient dark metal, carved magical runes, subtle glowing heart-shaped motifs, worn stone-and-metal detail, and warm violet-gold magical light in the grooves. It should feel mysterious, protective, and emotionally significant, not horror. No text, no letters, no logos, no readable symbols. The image should work as a stylized game texture that can be applied to a vault-door surface or used as a decorative overlay.`;

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(
  projectRoot,
  "public",
  "assets",
  "generated",
  "textures",
  "vault-door-runes.png",
);

function printStatus({ fileSize = "not generated", result }) {
  console.log(`model used: ${MODEL}`);
  console.log(`output format: ${OUTPUT_FORMAT}`);
  console.log(`output path: ${outputPath}`);
  console.log(`file size: ${fileSize}`);
  console.log(result);
}

function safeErrorMessage(error) {
  const key = process.env.OPENAI_API_KEY;
  const message = error instanceof Error ? error.message : String(error);
  return key ? message.replaceAll(key, "[redacted]") : message;
}

if (!process.env.OPENAI_API_KEY) {
  printStatus({
    result: "failure: OPENAI_API_KEY is missing.",
  });
  process.exit(1);
}

try {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const image = await openai.images.generate({
    model: MODEL,
    prompt: PROMPT,
    n: 1,
    output_format: OUTPUT_FORMAT,
    quality: QUALITY,
    size: SIZE,
  });

  const b64 = image.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error("The Images API response did not include base64 image data.");
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, Buffer.from(b64, "base64"));

  const { size } = await stat(outputPath);
  printStatus({
    fileSize: `${size} bytes`,
    result: "success: generated image",
  });
} catch (error) {
  printStatus({
    result: `failure: ${safeErrorMessage(error)}`,
  });
  process.exit(1);
}
