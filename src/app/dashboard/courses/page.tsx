import { createCourse, onSearchCourse } from "@/app/actions/course";
import { getUsers } from "@/app/actions/user";
import { CourseForm } from "@/components/CourseForm";
import { UpdateCourse } from "@/components/UpdateCourse";
import React from "react";

export default async function Courses() {
  const users = await getUsers();
  let categoryList = await fetch("http://103.252.119.85:8080/api/categories", {
    method: "GET",
    headers: new Headers({ "content-type": "application/json" }),
    mode: "no-cors",
  });
  let categories = await categoryList.json();

  return (
    <div style={{ display: "flex" }}>
      <CourseForm
        onCreate={createCourse}
        categories={categories}
        users={users}
      />
      <UpdateCourse onSearchCourse={onSearchCourse} />
    </div>
  );
}
