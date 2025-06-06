import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types/type";

interface PostTableProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

export const PostTable: React.FC<PostTableProps> = ({ posts, onDelete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const publishedPosts = posts?.filter((post) => post.status === "published");

    window.parent.postMessage(
      {
        type: "POST_LIST",
        payload: publishedPosts,
      },
      "*"
    );
  }, [posts]);

  return (
    <div className="overflow-x-auto rounded-lg shadow mt-6">
      <table className="min-w-[640px] w-full text-sm text-center bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">عنوان</th>
            <th className="p-3 border">نویسنده</th>
            <th className="p-3 border">تاریخ</th>
            <th className="p-3 border">وضعیت</th>
            <th className="p-3 border">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {posts?.length ? (
            posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="p-3 border">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    {post.title}
                  </button>
                </td>
                <td className="p-3 border">{post.author}</td>
                <td className="p-3 border">{post.date}</td>
                <td className="p-3 border">
                  {post.status === "draft" ? "پیش‌نویس" : "منتشر شده"}
                </td>
                <td className="p-3 border space-x-2 rtl:space-x-reverse">
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      className="text-white  bg-blue-500 rounded p-2 w-[50%]"
                      onClick={() => navigate(`/posts/edit/${post.id}`)}
                    >
                      ویرایش
                    </button>

                    <button
                      className="text-white bg-red-500  rounded p-2 w-[50%]"
                      onClick={() => onDelete(post.id)}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                پستی یافت نشد.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
