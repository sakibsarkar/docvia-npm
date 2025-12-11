export interface ChatMessage {
  id: string;
  sender: "agent" | "visitor";
  message: string;
  timestamp: Date;
}
