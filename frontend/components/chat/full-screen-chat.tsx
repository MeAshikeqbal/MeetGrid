"use client"

import { memo, useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { Send, Settings, LogOut, Users, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  sender: "you" | "other"
  text: string
  timestamp: Date
}

export const FullScreenChat = memo(function FullScreenChat() {
  const { theme, setTheme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: "you",
      text: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
  }

  const handleNext = () => {
    setMessages([])
    setIsConnected(true)
    console.log("Moving to next person")
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary/80 text-primary-foreground p-4 shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">MeetGrid Chat</h1>
          <p className="text-sm text-primary-foreground/80">
            {isConnected ? "Connected to a stranger" : "Connecting..."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={handleThemeToggle}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 md:p-6">
        {messages.length === 0 && isConnected && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <p className="text-lg font-semibold mb-2">Connected!</p>
            <p className="text-foreground/60">Say something to start the conversation</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm wrap-break-word ${
                message.sender === "you"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary text-secondary-foreground rounded-bl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-background/50 border-t border-primary/20 p-4 md:p-6 space-y-3">
        <div className="flex gap-3 flex-col-reverse md:flex-row">
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="flex-1 bg-background border border-primary/20 rounded-lg px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button className="rounded-lg px-4" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            className="w-full md:w-auto rounded-lg border-primary/20 bg-transparent"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
        <p className="text-xs text-foreground/50 text-center md:text-left">
          Press Enter to send • Click Next to skip and chat with someone else
        </p>
      </div>
    </div>
  )
})
