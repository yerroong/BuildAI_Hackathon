// src/upstageClient.ts
import fetch from 'node-fetch';

const UPSTAGE_API_KEY = process.env.UPSTAGE_API_KEY || 'up_kBlLWIsGhflmhoRr4tTHAjDqfx9tk';
const UPSTAGE_BASE_URL = "https://api.upstage.ai/v1"; // 실제 엔드포인트는 문서 확인

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface UpstageResponse {
  choices?: { message: { content: string } }[];
}

export class UpstageClient {
  apiKey: string;
  baseUrl: string;

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || UPSTAGE_BASE_URL;
  }

  /**
   * Upstage Solar Chat API에 메시지 배열을 보내고 응답 문자열을 반환합니다.
   */
  public async sendChatMessage(messages: ChatMessage[]): Promise<string> {
    const endpoint = `${this.baseUrl}/solar/chat`;
    const payload = {
      model: "solar-pro",
      messages,
      stream: false
    };

    const response = await fetch(endpoint, {
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
    const data = (await response.json()) as UpstageResponse;
    const answer = data.choices && data.choices[0] && data.choices[0].message.content;
    return answer || "";
  }
}