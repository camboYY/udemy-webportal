import React from "react";
import { IPost } from "@/types";
import { Post } from "@/components";
import Link from "next/link";

export default async function Posts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return (
    <ul>
      {data.map((post: IPost) => (
        <Link href={`posts/${post.id}`} key={post.id}>
          <Post {...post} />
        </Link>
      ))}
    </ul>
  );
}
