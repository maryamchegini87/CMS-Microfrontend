export interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

const CHAT_KEY = "chat_history";

export function getChatHistory(): ChatMessage[] {
  return JSON.parse(localStorage.getItem(CHAT_KEY) || "[]");
}

export function saveChatHistory(history: ChatMessage[]) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(history));
}

export function fakeBotReply(userMessage: string): string {
  return `شما گفتید: "${userMessage}".بزودی اپراتور سوال شما را پاسخ میدهد`;
}
