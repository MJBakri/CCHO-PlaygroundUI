export type ChatRoles = "user" | "assistant"

export type ChatMessage = {
  role: ChatRoles
  messageVersions: string[]
}

export interface ChatMessageProps {
  role: ChatRoles
  messageVersions: string[]
}

export interface ChatHistoryHook {
  addMessage: (message: ChatMessage) => void
  handleAiMessage: (role: ChatRoles, message: string) => void
  chatHistory: ChatMessage[]
}
export interface ChatComponentProps {
  sendFunction: (message: string) => Promise<void> | void
  ws: WebSocket | null
  chatHistoryHook?: ChatHistoryHook | null
}
