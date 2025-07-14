"use client"

import { ChatRoles } from "@/types"
import { useEffect, useRef } from "react"

interface Message {
  message: string
}

export default function useConnectSession(
  documentId: string,
  clientId: string,
  sessionConnection: string,
  aiMessageHandler?: (role: ChatRoles, message: string) => void
) {
  const WSRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    console.log(
      "Connecting to WebSocket with clientId:",
      clientId,
      sessionConnection
    )
    if (WSRef.current) {
      return
    }

    const ws = new WebSocket(`${sessionConnection}/${documentId}/${clientId}`)

    ws.onopen = () => {
      console.log("WebSocket connection established")
      // sendMessage({
      //   message:
      //     "Introduce yourself as a medical surveyor without mentioning any name and conduct the session.",
      // })
    }

    ws.onmessage = (event) => {
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
      // Check if connection exists and is open before closing
      if (WSRef.current?.readyState === WebSocket.OPEN) {
        console.log("Cleaning up WebSocket connection")
        WSRef.current.close()
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
