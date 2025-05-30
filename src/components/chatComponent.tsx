"use-client"

import useChatHistory from "@/hooks/useChatHistory"
import { ChatComponentProps, ChatMessageProps } from "@/types"
import { Bot, Send, User, User2 } from "lucide-react"
import { useRef, useState } from "react"

function ChatMessage({ role, messageVersions }: ChatMessageProps) {
  const [viewedMessage, setViewedMessage] = useState<number>(
    messageVersions.length - 1
  )

  if (role === "user") {
    return (
      <div className="flex gap-2 justify-end mb-2">
        <div className="bg-neutral-100 p-3 max-w-xl rounded-lg ">
          {messageVersions[viewedMessage]}
        </div>
        <div>
          <User2 className="mt-2 text-neutral-400" />
        </div>
      </div>
    )
  } else if (role === "assistant") {
    return (
      <div className="mb-2 flex gap-2">
        <Bot className="mt-2 text-neutral-400 flex-shrink-0" />
        <div className="p-2 rounded-lg flex-grow">
          {messageVersions[viewedMessage]}
        </div>
      </div>
    )
  }
}
export default function ChatComponent({
  chatHistoryHook,
  sendFunction,
  ws,
}: ChatComponentProps) {
  const TextRef = useRef<HTMLTextAreaElement | null>(null)
  const handleSendMessage = () => {
    if (!TextRef.current) return
    sendFunction(TextRef.current.value)
    chatHistoryHook?.addMessage({
      role: "user",
      messageVersions: [TextRef.current.value],
    })
    TextRef.current.value = ""
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow mt-4 h-0 w-[50vw] overflow-auto">
        {/* <ChatMessage
          role="user"
          messageVersions={[
            "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
          ]}
        />
        <ChatMessage role="assistant" messageVersions={["Hi there!"]} /> */}
        {chatHistoryHook?.chatHistory.map((message, index) => (
          <ChatMessage
            role={message.role}
            messageVersions={message.messageVersions}
            key={index}
          />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-2xl p-3  border shadow-lg mb-[100px] border-neutral-300 rounded-3xl">
          <textarea
            ref={TextRef}
            placeholder="Type a message..."
            className="p-2 resize-none w-full flex-grow outline-none focus:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          ></textarea>
          <div className="flex justify-end items-center mt-2">
            <button
              onClick={() => handleSendMessage()}
              className="bg-blue-500 text-white p-2 flex items-center justify-center rounded-full hover:bg-blue-800 transition-colors duration-200"
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
