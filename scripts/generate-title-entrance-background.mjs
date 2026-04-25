import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import OpenAI from "openai";

const MODEL = "gpt-image-2";
const OUTPUT_FORMAT = "webp";
const SIZE = "1536x1024";
const QUALITY = "medium";
const PROMPT = `Create a cinematic 16:9 title entrance background for a browser fantasy RPG called Hidden Hearts RPG.
Scene: a magical vault chamber at night, dark steel and brass architecture, soft cyan/gold/rose light, hidden-heart motifs, faint wing-like shadows, floating magical dust, distant city glow beyond the vault.
Composition: leave the right third calm and readable for a quiz console, place the vault door as a powerful first-viewport signal, no text, no logos, no watermark.
Style: polished painterly game background, atmospheric but not muddy, elegant, emotionally inviting, high contrast, web-optimized.
Output: 16:9 WebP background.`;

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(
  projectRoot,
  "public",
  "assets",
  "generated",
  "ui",
  "title-entrance-background.webp",
);

function printStatus({ fileSize = "not generated", result }) {
  console.log(`model used: ${MODEL}`);
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
