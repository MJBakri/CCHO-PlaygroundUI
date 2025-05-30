"use client"

import ChatComponent from "@/components/chatComponent"
import useChatHistory from "@/hooks/useChatHistory"
import useConnectSession from "@/hooks/useConnectSession"
import { useEffect, use, useRef } from "react"

interface SurveySessionProps {
  params: Promise<{ clientId: string }>
}

export default function SurveySession({ params }: SurveySessionProps) {
  const resolvedParams = use(params)
  const chHook = useChatHistory()
  const aiMessageHandlerRef = useRef(chHook.handleAiMessage)
  const { sendMessage, WSRef } = useConnectSession(
    resolvedParams.clientId,
    chHook.handleAiMessage
  )

  return (
    <div className="flex items-center justify-center">
      <ChatComponent
        chatHistoryHook={chHook}
        ws={WSRef.current}
        sendFunction={async (message: string) => {
          console.log("Sending message:", message)
          await sendMessage({ message })
          console.log("Message sent successfully")
        }}
      />
    </div>
  )
}
