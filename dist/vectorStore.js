"use strict";
// src/vectorStore.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorStore = void 0;
class VectorStore {
    constructor() {
        this.chunks = [];
    }
    addChunks(chunks) {
        this.chunks.push(...chunks);
    }
    /**
     * 질의 문자열과 일치하는 청크를 상위 topK개 반환합니다.
     */
    retrieve(query, topK = 2) {
        const lowerQuery = query.toLowerCase();
        const scored = this.chunks.map(chunk => {
            const count = (chunk.content.toLowerCase().match(new RegExp(lowerQuery, "g")) || []).length;
            return { chunk, score: count };
        });
        scored.sort((a, b) => b.score - a.score);
        return scored.filter(item => item.score > 0).slice(0, topK).map(item => item.chunk);
    }
    getAllChunks() {
        return this.chunks;
    }
}
exports.VectorStore = VectorStore;
