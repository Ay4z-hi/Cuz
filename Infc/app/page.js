"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMsg = { role: "assistant", content: data.reply };
    setMessages([...messages, userMsg, botMsg]);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl mb-4 font-bold">🤖 Inf.C Chat</h1>
      <div className="border border-gray-700 p-4 rounded h-[400px] overflow-y-auto bg-gray-800">
        {messages.map((msg, i) => (
          <div key={i} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <div className="inline-block p-2 rounded bg-gray-700">{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow p-2 rounded bg-gray-700 text-white"
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="ml-2 px-4 bg-blue-600 rounded">Send</button>
      </div>
    </main>
  );
    }
