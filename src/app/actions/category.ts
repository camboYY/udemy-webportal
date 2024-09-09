"use server";

import { ICategoryFormProp } from "@/types";
import { getToken } from "../_lib/lib";

export async function createCategory(props: ICategoryFormProp) {
  const { name, parentId } = props;

  const result = await fetch("http://103.252.119.85:8080/api/categories", {
    method: "POST",
    body: JSON.stringify({ name, parentId }),
    headers: new Headers({
      "content-type": "application/json",
    }),
    mode: "no-cors",
  });
  if (result.ok) return await result.json();
  throw new Error("oop something went wrong");
}
