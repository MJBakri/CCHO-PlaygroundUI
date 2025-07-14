"use client"

import ChatComponent from "@/components/chatComponent"
import useChatHistory from "@/hooks/useChatHistory"
import useConnectSession from "@/hooks/useConnectSession"
import { useEffect, use, useRef } from "react"

interface SurveySessionProps {
  params: Promise<{ clientId: string; documentId: string }>
}

export default function SurveySession({ params }: SurveySessionProps) {
  const resolvedParams = use(params)
  const chHook = useChatHistory()
  const aiMessageHandlerRef = useRef(chHook.handleAiMessage)
  const { sendMessage, WSRef } = useConnectSession(
    resolvedParams.documentId,
    resolvedParams.clientId,
    process.env.NEXT_PUBLIC_WS_ANALYTICS_SESSION_CONNECTION || "",
    chHook.handleAiMessage
  )

  return (
    <div className="flex h-full overflow-auto">
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
