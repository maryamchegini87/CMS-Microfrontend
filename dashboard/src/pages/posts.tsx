import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
import {  type Post } from "../types/type";
import { FilterForm } from "../components/FilterForm";
import { PostTable } from "../components/PostTable";

export default function Posts() {
  const navigate = useNavigate();

  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("posts");
    setPosts(stored && JSON.parse(stored));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts?.filter((post) => {
      const matchesAuthor = author ? post.author === author : true;
      const matchesStatus = status ? post.status === status : true;
      const matchesForm = fromDate ? post.date >= fromDate : true;
      const matchesTo = toDate ? post.date <= toDate : true;
      return matchesAuthor && matchesStatus && matchesForm && matchesTo;
    });
  }, [posts, author, status, fromDate, toDate]);

  useEffect(() => {
    const user = { name: "مریم چگینی", role: "نویسنده" };
    window.parent.postMessage({ type: "USER_INFO", payload: user }, "*");
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm("آیا از حذف این پست مطمئن هستید؟")) return;
      const updatedPosts = posts?.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    },
    [posts]
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">لیست پست‌ها</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => navigate("/posts/new")}
        >
          افزودن پست جدید
        </button>
      </div>

      <FilterForm
        author={author}
        status={status}
        fromDate={fromDate}
        toDate={toDate}
        onAuthorChange={setAuthor}
        onStatusChange={setStatus}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      <PostTable posts={filteredPosts} onDelete={handleDelete} />
    </div>
  );
}
