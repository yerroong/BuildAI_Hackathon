import fs from 'fs';
const pdf = require('pdf-parse'); // CommonJS 방식의 require 사용

export async function parsePDF(filePath: string): Promise<string> {
  const dataBuffer: Buffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}


export function splitTextIntoChunks(text: string, chunkSize: number = 500): string[] {
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
  const chunks: string[] = [];
  let currentChunk = "";
  for (const para of paragraphs) {
    if ((currentChunk + " " + para).trim().length > chunkSize) {
      chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += " " + para;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}