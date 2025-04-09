export interface DocumentChunk {
    id: string;
    content: string;
  }
  
  export class VectorStore {
    private chunks: DocumentChunk[];
  
    constructor() {
      this.chunks = [];
    }
  
    public addChunks(chunks: DocumentChunk[]): void {
      this.chunks.push(...chunks);
    }
  
    public retrieve(query: string, topK: number = 2): DocumentChunk[] {
      const lowerQuery = query.toLowerCase();
      const scored = this.chunks.map(chunk => {
        const count = (chunk.content.toLowerCase().match(new RegExp(lowerQuery, "g")) || []).length;
        return { chunk, score: count };
      });
      scored.sort((a, b) => b.score - a.score);
      return scored.filter(item => item.score > 0).slice(0, topK).map(item => item.chunk);
    }
  
    public getAllChunks(): DocumentChunk[] {
      return this.chunks;
    }
  }  