import { getUsers } from "@/app/actions";
import { onCreateCourseLesson, onSearchCourse } from "@/app/actions/course";
import { CourseLessonForm } from "@/components/CourseLessonForm";

export default async function CourseLessons() {
  const userList = await getUsers();

  return (
    <CourseLessonForm
      users={userList}
      onCreate={onCreateCourseLesson}
      onSearchCourse={onSearchCourse}
    />
  );
}
