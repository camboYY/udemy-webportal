import { onSearchCourse, onCreateCourseTag } from "@/app/actions/course";
import { CourseTagForm } from "@/components/CourseTagForm";
import React from "react";

export default async function CourseTag() {
  return (
    <CourseTagForm
      onCreate={onCreateCourseTag}
      onSearchCourse={onSearchCourse}
    />
  );
}
