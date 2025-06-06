import { useEffect, useRef } from "react";

type Props = {
  src: string;
  posts: any[];
};

export default function IframeContainer({ src, posts }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const publishedPosts = posts.filter((post) => post.status === "published");
      iframe.contentWindow?.postMessage(
        {
          type: "POST_LIST",
          payload: publishedPosts,
        },
        "*"
      );
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [posts, src]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      className="w-full h-full border-0 overflow-hidden"
      title="Micro App"
    />
  );
}
