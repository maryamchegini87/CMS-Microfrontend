import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "../types/type";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const posts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const found = posts?.find((p) => p.id === Number(id));
    if (found) setPost(found);
  }, [id]);

  if (!post) {
    return (
      <div className="p-6">
        <h2 className="text-xl text-red-500">پست پیدا نشد.</h2>
        <Link to="/posts" className="text-blue-500 underline mt-4 inline-block">
          بازگشت به لیست پست‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-gray-600 text-sm mb-4">
        توسط <span className="font-semibold">{post.author}</span> در {post.date}{" "}
        | وضعیت: {post.status === "draft" ? "پیش‌نویس" : "منتشر شده"}
      </div>

      <p className="text-lg leading-relaxed mt-6">{post.content}</p>

      <Link
        to="/posts"
        className="inline-block mt-6 text-blue-500 hover:underline"
      >
        بازگشت به لیست پست‌ها
      </Link>
    </div>
  );
}
