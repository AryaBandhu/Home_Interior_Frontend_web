import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"
import { X, MessageCircle, ChevronLeft } from "lucide-react"

interface QA {
  id: number
  question: string
  answer: string
}

interface Message {
  type: "question" | "answer" | "greeting"
  text: string
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [qas, setQas] = useState<QA[]>([])
  const [messages, setMessages] = useState<Message[]>([
    { type: "greeting", text: "Hi! 👋 I'm your AI assistant. How can I help you today?" },
  ])
  const [loading, setLoading] = useState(false)
  const [showQuestions, setShowQuestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    axios.get(`${API_BASE_URL}/chatbot/`).then((r) => setQas(r.data))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const handleQuestion = (qa: QA) => {
    setShowQuestions(false)
    setMessages((prev) => [...prev, { type: "question", text: qa.question }])
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMessages((prev) => [...prev, { type: "answer", text: qa.answer }])
      setShowQuestions(true)
    }, 1500)
  }

  const handleReset = () => {
    setMessages([{ type: "greeting", text: "Hi! 👋 I'm your AI assistant. How can I help you today?" }])
    setShowQuestions(true)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10 bg-white dark:bg-zinc-900"
          style={{ maxHeight: "520px" }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl">🤖</div>
            <div>
              <p className="text-white font-semibold text-sm">AI Assistant</p>
              <p className="text-violet-200 text-xs">Always here to help</p>
            </div>
            {messages.length > 1 && (
              <button onClick={handleReset} className="ml-auto text-white/70 hover:text-white transition-colors" title="Start over">
                <ChevronLeft size={18} />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "300px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === "question" ? "justify-end" : "justify-start"}`}>
                {msg.type !== "question" && (
                  <span className="mr-2 mt-1 text-lg">🤖</span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 text-sm max-w-[80%] leading-relaxed ${
                    msg.type === "question"
                      ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing loader */}
            {loading && (
              <div className="flex justify-start items-end gap-2">
                <span className="text-lg">🤖</span>
                <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Questions */}
          {showQuestions && qas.length > 0 && (
            <div className="border-t border-gray-100 dark:border-zinc-800 p-3 space-y-2 overflow-y-auto" style={{ maxHeight: "160px" }}>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium px-1">Choose a question:</p>
              {qas.map((qa) => (
                <button
                  key={qa.id}
                  onClick={() => handleQuestion(qa)}
                  className="w-full text-left text-sm px-3 py-2 rounded-xl border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
                >
                  {qa.question}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
