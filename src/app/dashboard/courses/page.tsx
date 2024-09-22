import { createCourse } from "@/app/actions/course";
import { CourseForm } from "@/components/CourseForm";
import React from "react";

export default async function Courses() {
  let userList = await fetch("http://103.252.119.85:8080/api/users/list", {
    method: "GET",
    headers: new Headers({ "content-type": "application/json" }),
    mode: "no-cors",
  });
  let users = await userList.json();
  let categoryList = await fetch("http://103.252.119.85:8080/api/categories", {
    method: "GET",
    headers: new Headers({ "content-type": "application/json" }),
    mode: "no-cors",
  });
  let categories = await categoryList.json();

  return (
    <CourseForm onCreate={createCourse} categories={categories} users={users} />
  );
}
