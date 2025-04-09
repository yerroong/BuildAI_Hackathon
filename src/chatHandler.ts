import { UpstageClient, ChatMessage } from "./upstageClient";
import { VectorStore } from "./vectorStore";

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export class ChatHandler {
  private upstageClient: UpstageClient;
  private vectorStore: VectorStore;
  private chatHistory: ChatHistoryItem[];

  constructor(upstageClient: UpstageClient, vectorStore: VectorStore) {
    this.upstageClient = upstageClient;
    this.vectorStore = vectorStore;
    this.chatHistory = [];
  }

  public addToHistory(role: "user" | "assistant", content: string): void {
    this.chatHistory.push({ role, content });
  }

  public getHistoryText(): string {
    return this.chatHistory
      .map(item => `${item.role === "user" ? "User" : "Bot"}: ${item.content}`)
      .join("\n");
  }

  public async processChat(userInput: string): Promise<string> {
    const relevantChunks = this.vectorStore.retrieve(userInput, 2);
    const context = relevantChunks.map(chunk => chunk.content).join("\n---\n");
    const systemPrompt = `You are a helpful assistant. Use the following context to answer the question if relevant:\n${context}`;

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...this.chatHistory.map(item => ({ role: item.role, content: item.content })),
      { role: "user", content: userInput }
    ];

    const answer = await this.upstageClient.sendChatMessage(messages);
    this.addToHistory("user", userInput);
    this.addToHistory("assistant", answer);
    return answer;
  }

  public getChatHistory(): ChatHistoryItem[] {
    return this.chatHistory;
  }
}