import { CourseLessonForm } from "@/components/CourseLessonForm";
import { onSearchCourse, onCreateCourseLesson } from "@/app/actions/course";

export default async function CourseLessons() {
  const userList = await fetch("http://103.252.119.85:8080/api/users/list", {
    method: "GET",
    headers: new Headers({ "content-type": "application/json" }),
    mode: "no-cors",
  });
  const users = await userList.json();

  return (
    <CourseLessonForm
      users={users}
      onCreate={onCreateCourseLesson}
      onSearchCourse={onSearchCourse}
    />
  );
}
