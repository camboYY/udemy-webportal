"use server";

import { ICourseFormProp, ICourseTag } from "@/types";

export async function createCourse(props: ICourseFormProp) {
  const result = await fetch("http://103.252.119.85:8080/api/courses", {
    method: "POST",
    body: JSON.stringify({ ...props }),
    headers: new Headers({
      "content-type": "application/json",
    }),
    mode: "no-cors",
  });

  if (result.ok) return await result.json();
  throw new Error("oop something went wrong");
}

export const onCreateCourseTag = async (props: ICourseTag) => {
  try {
    const result = await fetch("http://103.252.119.85:8080/api/courseTags", {
      method: "POST",
      body: JSON.stringify({ ...props }),
      headers: new Headers({ "content-type": "application/json" }),
      mode: "no-cors",
    });

    return await result.json();
  } catch (e) {
    console.log(e);
  }
};

export async function onSearchCourse(course?: string) {
  try {
    const result = await fetch(
      `http://103.252.119.85:8080/api/courses/page/1?keyword=${course}`,
      {
        headers: new Headers({ "content-type": "application/json" }),
        mode: "no-cors",
      }
    );

    if (result.ok) return await result.json();
  } catch (e) {
    console.log(e);
  }
}
