import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "../types/type";
import PostForm from "../components/PostForm";

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const allPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const found = allPosts.find((p) => p.id === Number(id));
    if (found) {
      setPost(found);
    }
  }, [id]);

  const handleUpdate = (updatedPost: Post) => {
    const allPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPosts = allPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  if (!post) return <p className="p-6">در حال بارگذاری پست...</p>;

  return (
    <>
      بازگشت
      <h2 className="text-2xl font-bold mb-4">ویرایش پست</h2>
      <PostForm initialData={post} onSubmit={handleUpdate} />
    </>
  );
}
