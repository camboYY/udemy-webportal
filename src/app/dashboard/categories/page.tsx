import { createCategory } from "@/app/actions";
import { CategoryForm } from "@/components";
import React from "react";

export default function Categories() {
  return <CategoryForm onCreate={createCategory} />;
}
