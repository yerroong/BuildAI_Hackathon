"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePDF = parsePDF;
exports.splitTextIntoChunks = splitTextIntoChunks;
// src/pdfUtils.ts
const fs_1 = __importDefault(require("fs"));
const pdf = require('pdf-parse'); // CommonJS 방식으로 pdf-parse를 불러옵니다.
/**
 * 주어진 파일 경로의 PDF를 파싱하여 텍스트를 추출합니다.
 */
async function parsePDF(filePath) {
    const dataBuffer = fs_1.default.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
}
/**
 * 추출한 텍스트를 chunkSize 기준으로 청크 단위로 분할합니다.
 */
function splitTextIntoChunks(text, chunkSize = 500) {
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    const chunks = [];
    let currentChunk = "";
    for (const para of paragraphs) {
        if ((currentChunk + " " + para).trim().length > chunkSize) {
            chunks.push(currentChunk.trim());
            currentChunk = para;
        }
        else {
            currentChunk += " " + para;
        }
    }
    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }
    return chunks;
}
