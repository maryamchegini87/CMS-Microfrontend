import { useState } from "react";
import type { Post, PostStatus } from "../types/type";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  initialData?: Post;
  onSubmit: (post: Post) => void;
}

export default function PostForm({ initialData, onSubmit }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [status, setStatus] = useState<PostStatus>(
    initialData?.status || "draft"
  );
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const post: Post = {
      id: initialData?.id || Date.now(),
      title,
      author,
      date,
      status,
      content,
    };

    onSubmit(post);
    navigate("/posts");
  };

  return (
    <>
      <Link to="/posts" className="text-blue-500 underline mt-4 inline-block">
        بازگشت به لیست پست‌ها
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full text-right flex flex-col gap-4 border border-gray-100 rounded shadow-md p-2"
      >
        <div>
          <label className="block font-semibold ">عنوان</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">نویسنده</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">تاریخ انتشار</label>
          <input
            type="date"
            className="w-full border px-2 py-1 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">وضعیت</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PostStatus)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">محتوای پست</label>
          <textarea
            className="w-full border px-2 py-1 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ذخیره
        </button>
      </form>
    </>
  );
}
