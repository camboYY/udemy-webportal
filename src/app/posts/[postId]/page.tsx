import { Post } from "@/components";
import React from "react";

export default async function PostDetail({
  params,
}: {
  params: { postId: string };
}) {
  console.log({ params });
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();
  return <Post {...data} />;
}
