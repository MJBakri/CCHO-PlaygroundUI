"use client"

import { ChatMessage, ChatRoles } from "@/types"
import { useRef, useState } from "react"

export default function useChatHistory() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const currentMessage = useRef<string>("")
  const addMessage = (message: ChatMessage) => {
    currentMessage.current = ""
    setChatHistory((prev) => [...prev, message])
  }

  const handleAiMessage = (role: ChatRoles, message: string) => {
    if (role !== "assistant") {
      console.error("Invalid role for AI message:", role)
      return
    }
    currentMessage.current += message
    setChatHistory((prev) => {
      if (prev.length === 0 || prev[prev.length - 1].role !== "assistant") {
        // If the last message is not from the assistant, create a new message
        return [...prev, { role, messageVersions: [message] }]
      }
      const copy = [...prev]
      let lastAiMessage = copy[copy.length - 1].messageVersions[0]
      lastAiMessage = currentMessage.current
      copy[copy.length - 1].messageVersions[0] = lastAiMessage
      return copy
    })
  }

  return {
    addMessage,
    handleAiMessage,
    chatHistory,
  }
}
