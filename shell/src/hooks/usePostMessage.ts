import { useEffect } from "react";

type Post = {
  id: string;
  title: string;
  author: string;
  date: string;
  status: string;
  content: string;
};

type UserInfo = {
  name: string;
  role: string;
};

export function usePostMessage(
  onUserInfo: (info: UserInfo) => void,
  onAddPost: (post: Post) => void,
  onSetPosts: (posts: Post[]) => void
) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data || {};
      switch (type) {
        case "USER_INFO":
          onUserInfo(payload);
          break;
        case "ADD_POST":
          onAddPost(payload);
          break;
        case "POST_LIST":
          onSetPosts(payload);
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
}
