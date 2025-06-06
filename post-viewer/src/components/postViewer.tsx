import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  author: string;
  date: string;
  status: string;
  content: string;
};

function PostViewer() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5173") return;

      if (event.data?.type === "POST_LIST") {
        setPosts(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="p-4 overflow-x-hidden flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">
        {posts.length ? "پست‌های منتشر شده" : "هیچ پستی برای نمایش وجود ندارد"}
      </h2>
     
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white p-4 rounded shadow-md border border-gray-200 overflow-hidden"
          >
            <h3 className="font-semibold text-lg break-words">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              نوشته شده توسط {post.author} در {post.date}
            </p>
            <p className="break-words whitespace-pre-wrap">{post.content}</p>
          </article>
        ))}
    
    </div>
  );
}

export default PostViewer;
