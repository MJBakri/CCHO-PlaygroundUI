"use client"

import { ChatRoles } from "@/types"
import { useEffect, useRef } from "react"

interface Message {
  message: string
}

export default function useConnectSession(
  clientId: string,
  aiMessageHandler?: (role: ChatRoles, message: string) => void
) {
  const WSRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    console.log(
      "Connecting to WebSocket with clientId:",
      clientId,
      process.env.NEXT_PUBLIC_WS_SESSION_CONNECTION
    )
    if (WSRef.current) {
      return
    }

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_SESSION_CONNECTION}/${clientId}`
    )

    ws.onopen = () => {
      console.log("WebSocket connection established")
    }

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data)
      try {
        const data = JSON.parse(event.data)
        if (data.reply && aiMessageHandler) {
          aiMessageHandler("assistant", data.reply)
        } else {
          console.warn("Received message without 'message' field:", data)
        }
      } catch (error) {
        console.error("Error parsing message from server:", error, event.data)
      }
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    ws.onclose = () => {
      console.log("WebSocket connection closed")
    }

    WSRef.current = ws

    return () => {
      if (WSRef.current) {
        WSRef.current.close()
        WSRef.current = null
      }
    }
  }, [])

  async function sendMessage(message: Message) {
    if (WSRef.current && WSRef.current.readyState === WebSocket.OPEN) {
      const stringifiedMessage = JSON.stringify(message)
      WSRef.current.send(stringifiedMessage)
    } else {
      console.error("WebSocket is not open. Cannot send message.")
    }
  }

  return {
    sendMessage,
    WSRef,
  }
}
