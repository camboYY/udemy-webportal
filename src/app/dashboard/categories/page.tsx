import { createCategory } from "@/app/actions";
import { CategoryForm } from "@/components";
import React from "react";

export default async function Categories() {
  let categoryList = await fetch("http://103.252.119.85:8080/api/categories", {
    method: "GET",
    headers: new Headers({ "content-type": "application/json" }),
    mode: "no-cors",
  });
  let categories = await categoryList.json();
  return <CategoryForm categories={categories} onCreate={createCategory} />;
}
