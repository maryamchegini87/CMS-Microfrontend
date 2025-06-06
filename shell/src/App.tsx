import { useState } from "react";
import Chat from "./components/chat";
import IframeContainer from "./components/IframeContainer";
import { usePostMessage } from "./hooks/usePostMessage";

const apps = {
  داشبورد: "http://localhost:5174",
  "لیست پست ها": "http://localhost:5175",
};

function App() {
  const [activeApp, setActiveApp] = useState<keyof typeof apps>("داشبورد");
  const [userInfo, setUserInfo] = useState<{ name: string; role: string } | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  usePostMessage(
    setUserInfo,
    (post) => setPosts((prev) => (Array.isArray(prev) ? [...prev, post] : [post])),
    setPosts
  );

  return (
    <section className="h-screen flex flex-col w-screen">
      <nav className="bg-gray-800 text-white flex space-x-4 p-4">
        {Object.keys(apps).map((key) => (
          <button
            key={key}
            onClick={() => setActiveApp(key as keyof typeof apps)}
            className={`px-4 py-2 rounded ${
              activeApp === key ? "bg-gray-600" : "bg-gray-700"
            }`}
          >
            {key}
          </button>
        ))}
      </nav>

      <section className="flex-1">
        <IframeContainer src={apps[activeApp]} posts={posts} />
      </section>

      <Chat user={userInfo} />
    </section>
  );
}

export default App;
