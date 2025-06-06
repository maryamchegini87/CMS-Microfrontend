import PostForm from "../components/PostForm";
import type { Post } from "../types/type";

export default function NewPost() {
  const handleAddPost = (post: Post) => {
    const existing = JSON.parse(localStorage.getItem("posts") || "[]");
    localStorage.setItem("posts", JSON.stringify([...existing, post]));
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">افزودن پست جدید</h2>
      <PostForm onSubmit={handleAddPost} />
    </>
  );
}
