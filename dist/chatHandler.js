"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHandler = void 0;
class ChatHandler {
    constructor(upstageClient, vectorStore) {
        this.upstageClient = upstageClient;
        this.vectorStore = vectorStore;
        this.chatHistory = [];
    }
    addToHistory(role, content) {
        this.chatHistory.push({ role, content });
    }
    getHistoryText() {
        return this.chatHistory
            .map(item => `${item.role === "user" ? "User" : "Bot"}: ${item.content}`)
            .join("\n");
    }
    /**
     * 사용자 입력에 대해 관련 청크를 검색하고, 시스템 프롬프트와 이전 대화 기록을 포함하여
     * Upstage API에 메시지를 보내고 답변을 생성합니다.
     */
    async processChat(userInput) {
        const relevantChunks = this.vectorStore.retrieve(userInput, 2);
        const context = relevantChunks.map(chunk => chunk.content).join("\n---\n");
        const systemPrompt = `You are a helpful assistant. Use the following context to answer the question if relevant:\n${context}`;
        const messages = [
            { role: "system", content: systemPrompt },
            ...this.chatHistory.map(item => ({ role: item.role, content: item.content })),
            { role: "user", content: userInput }
        ];
        const answer = await this.upstageClient.sendChatMessage(messages);
        this.addToHistory("user", userInput);
        this.addToHistory("assistant", answer);
        return answer;
    }
    getChatHistory() {
        return this.chatHistory;
    }
}
exports.ChatHandler = ChatHandler;
