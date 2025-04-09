"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpstageClient = void 0;
// src/upstageClient.ts
const node_fetch_1 = __importDefault(require("node-fetch"));
const UPSTAGE_API_KEY = process.env.UPSTAGE_API_KEY || 'up_kBlLWIsGhflmhoRr4tTHAjDqfx9tk';
const UPSTAGE_BASE_URL = "https://api.upstage.ai/v1"; // 실제 엔드포인트는 문서 확인
class UpstageClient {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl || UPSTAGE_BASE_URL;
    }
    /**
     * Upstage Solar Chat API에 메시지 배열을 보내고 응답 문자열을 반환합니다.
     */
    async sendChatMessage(messages) {
        const endpoint = `${this.baseUrl}/solar/chat`;
        const payload = {
            model: "solar-pro",
            messages,
            stream: false
        };
        const response = await (0, node_fetch_1.default)(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Upstage API error: ${response.status} - ${errorText}`);
        }
        const data = (await response.json());
        const answer = data.choices && data.choices[0] && data.choices[0].message.content;
        return answer || "";
    }
}
exports.UpstageClient = UpstageClient;
