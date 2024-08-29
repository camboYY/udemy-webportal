import { IPost } from "@/types";
import React from "react";

export function Post(post: IPost) {
  return (
    <React.Fragment>
      <li>{post.title}</li>
      <li>{post.body}</li>
      <li>{post.userId}</li>
      <hr />
    </React.Fragment>
  );
}
