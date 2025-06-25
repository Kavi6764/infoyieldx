import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bot from "../assets/bot.png";
import { BotIcon, Send, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const greeting = getGreeting();
      setMessages([
        { from: "bot", text: `${greeting}! 👋 How can I help you?` },
        {
          from: "bot",
          text: "Here are some sections you can explore:",
          type: "options",
          options: [
            { label: "Web Development", route: "/web-development" },
            { label: "App Development", route: "/app-development" },
            { label: "Accounting", route: "/accounts" },
            { label: "Oracle EBS", route: "/oracle-ebs" },
            { label: "Oracle DB", route: "/oracle-db" },
            { label: "About Us", route: "/about" },
            { label: "Portfolio", route: "/portfolio" },
            { label: "Contact", route: "/contact" },
          ],
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks for reaching out! We'll reply soon. 💬" },
      ]);
    }, 1000);
  };

  const handleOptionClick = (option) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: option.label },
      {
        from: "bot",
        text: `Great choice! Redirecting to ${option.label} page...`,
      },
    ]);
    setTimeout(() => {
      navigate(option.route);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <img
          src={bot}
          alt="Chatbot"
          className="w-12 cursor-pointer animate-bounce"
          onClick={() => setIsOpen(true)}
        />
      )}

      {isOpen && (
        <div className="flex flex-col h-[70vh] w-[90vw] sm:w-[25vw] border shadow-2xl bg-white rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/80 text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <BotIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              <div>
                <h3 className="font-semibold">Infoyieldx Assistant</h3>
                <p className="text-sm text-green-300">Online Now</p>
              </div>
            </div>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 bg-[#f9fafb] text-sm">
            <div className="flex flex-col gap-3">
              {messages.map((msg, i) =>
                msg.type === "options" ? (
                  <div key={i} className="self-start bg-white shadow-md rounded-lg p-3">
                    <p className="mb-2 text-[#111827]">{msg.text}</p>
                    <div className="flex flex-col gap-2">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="bg-[#e0f2fe] text-[#0c4a6e] border border-blue-400 rounded-md px-3 py-2 hover:bg-[#bae6fd] transition"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className={`p-3 rounded-lg w-fit max-w-[85%] sm:max-w-[75%] ${
                      msg.from === "user"
                        ? "self-end bg-[#e0f2fe] text-[#0c4a6e] rounded-tr-none"
                        : "self-start bg-white text-[#111827] shadow-md rounded-tl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                )
              )}
              <div ref={endRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-2 border-t bg-[#f1f5f9] rounded-b-2xl">
            <div className="flex items-center gap-2 px-3 w-[90%] mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write a message..."
                className="p-2 text-sm w-full border bg-white rounded-md outline-none"
              />
              <Send
                className="w-6 h-6 text-[#1d4ed8] cursor-pointer"
                onClick={handleSend}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
