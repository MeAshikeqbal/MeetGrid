'use client'

import { memo, useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  sender: 'you' | 'other'
  text: string
  timestamp: Date
}

export const ChatSidebar = memo(function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'you',
      text: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')
  }

  return (
    <div className="w-80 flex flex-col bg-background/50 border-l border-primary/20 md:flex hidden">
      {/* Header */}
      <div className="p-4 border-b border-primary/20">
        <h2 className="font-semibold">Chat</h2>
        <p className="text-sm text-foreground/60 mt-1">Message your chat partner</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="text-foreground/40 text-sm">
              <p>Start a conversation!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.sender === 'you'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-primary/20 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage()
            }}
            className="flex-1 bg-background/50 border border-primary/20 rounded-lg px-3 py-2 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button
            size="sm"
            className="rounded-lg"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-foreground/50">Press Enter to send</p>
      </div>
    </div>
  )
})
