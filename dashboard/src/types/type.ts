export type PostStatus = "draft" | "published";

export interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  status: PostStatus;
  content:string
}

