import { useEffect, useRef, useState } from "react";
import {
  type ChatMessage,
  fakeBotReply,
  getChatHistory,
  saveChatHistory,
} from "../utils/chatUtils";
import { MessageCircle } from "lucide-react";

export default function Chat({
  user,
}: {
  user: { name: string; role: string } | null;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getChatHistory());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    saveChatHistory(newMessages);
    setInput("");

    const fullReply = fakeBotReply(input);
    let streamed = "";

    setStreaming(true);
    for (let i = 0; i <= fullReply.length; i++) {
      await new Promise((r) => setTimeout(r, 20));
      streamed = fullReply.slice(0, i);
      setMessages([...newMessages, { role: "bot", content: streamed }]);
    }

    const finalMessages = [...newMessages, { role: "bot", content: fullReply }];
    setMessages(finalMessages);
    saveChatHistory(finalMessages);
    setStreaming(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-xl border flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white font-bold">
            <span>گفتگو با {user?.name && `(${user.name})`}</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-green-100 text-left"
                }`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-2 flex gap-2 border-t"
          >
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="پیامتو بنویس..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={streaming}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              ارسال
            </button>
          </form>
        </div>
      )}

      {!open && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Open Chat"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
