import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, User, Headphones } from 'lucide-react'

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isAgentOnline, setIsAgentOnline] = useState(true)
  const messagesEndRef = useRef(null)

  // Sample initial messages
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! 👋 Welcome to ShopHub. How can I help you today?",
        sender: "agent",
        timestamp: new Date(Date.now() - 300000)
      }
    ])
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newUserMessage])
    setInputValue('')

    // Simulate agent response after a delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Let me check that for you.",
        "I understand your concern. Let me help you with that.",
        "Great question! Here's what I can tell you about that...",
        "I've noted your request. Is there anything else I can help with?",
        "That's a common question. Here's what I recommend..."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const newAgentMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "agent",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newAgentMessage])
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Headphones className="w-5 h-5" />
              <h3 className="font-semibold">Live Support</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${isAgentOnline ? 'bg-green-400' : 'bg-gray-400'}`}></span>
              <span className="text-xs">{isAgentOnline ? 'Online' : 'Offline'}</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'agent' && <Headphones className="w-4 h-4 mr-1" />}
                    {message.sender === 'user' && <User className="w-4 h-4 mr-1" />}
                    <span className="text-xs font-medium">
                      {message.sender === 'user' ? 'You' : 'Support Agent'}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-primary text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isAgentOnline 
                ? 'Typically replies in a few minutes' 
                : 'We\'ll get back to you as soon as possible'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default LiveChat
