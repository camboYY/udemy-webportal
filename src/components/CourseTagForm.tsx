"use client";
import { ICourseFormProp, ICourseFormWithIdProp, ICourseTag } from "@/types";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Formik, FormikHelpers } from "formik";
import { ChangeEvent, useCallback, useState } from "react";
import * as Yup from "yup";
import { CourseCard } from "./CourseCard";

export function CourseTagForm({
  onCreate,
  onSearchCourse,
}: {
  onCreate: (props: ICourseTag) => Promise<void>;
  onSearchCourse: (course?: string) => Promise<ICourseFormWithIdProp[]>;
}) {
  const toast = useToast({ position: "top" });
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [courseNotFound, setCourseNotFound] = useState("");

  const [query, setQuery] = useState("");
  const [course, setCourse] = useState<ICourseFormWithIdProp | undefined>(
    undefined
  );

  const [courses, setCourses] = useState<ICourseFormWithIdProp[]>([]);

  const onCourseChosen = useCallback(
    (course?: ICourseFormProp & { id: number }) => {
      setCourse(course);
    },
    []
  );
  const initialValues: ICourseTag = {
    title: "",
    courseId: 0,
  };

  const onSearch = useCallback(async () => {
    setSearchLoading(true);
    const courseList = await onSearchCourse(query);
    setCourses(courseList);
    if (courseList?.length === 1) {
      setCourse(courseList[0]);
    }
    if (courseList?.length === 0) {
      setCourseNotFound("Course not found");
    } else {
      setCourseNotFound("");
    }
    setSearchLoading(false);
  }, [query, onSearchCourse]);

  const onSetQuery = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (values: ICourseTag, { resetForm }: FormikHelpers<ICourseTag>) => {
      setLoading(true);
      try {
        await onCreate({ ...values, courseId: Number(course?.id) });
        toast({
          title: "Course Tag created.",
          description: "Your Course tag has been created!",
          status: "success",
          duration: 9000,
        });
        resetForm();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [onCreate, toast, course]
  );

  const loginSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    courseId: Yup.number().required("Required"),
  });

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{ display: "flex", marginTop: 10, marginBottom: 20, border: 1 }}
      >
        <Input
          value={query}
          name="course"
          placeholder="Search course title"
          onChange={onSetQuery}
          type="text"
        />
        <Button type="button" isLoading={searchLoading} onClick={onSearch}>
          Search
        </Button>
      </div>
      <Formik
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        initialValues={initialValues}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          values: { title, courseId },
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <StyledContainer>
                {courses?.length > 0 && (
                  <CourseCard onChosen={onCourseChosen} courses={courses} />
                )}
                {!!courseNotFound && (
                  <h2 style={{ marginBottom: 10 }}>{courseNotFound}</h2>
                )}
                <FormControl
                  style={{ marginBottom: 15 }}
                  isInvalid={!!(errors.title && touched.title)}
                >
                  <Input
                    type="text"
                    name="title"
                    placeholder="Course tag name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={title}
                  />
                  {errors.title && touched.title ? (
                    <FormErrorMessage>{errors?.title}</FormErrorMessage>
                  ) : null}
                </FormControl>
                {!!course ? (
                  <FormControl
                    isInvalid={!!(errors.courseId && touched.courseId)}
                    style={{ marginBottom: 15 }}
                  >
                    <div
                      style={{
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: "#6A9AB0",
                      }}
                    >
                      <div style={{ color: "white" }}>{course?.title}</div>
                    </div>
                    {errors.courseId && touched.courseId ? (
                      <FormErrorMessage>{errors?.courseId}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                ) : null}

                <Button isLoading={loading} type="submit">
                  Submit
                </Button>
              </StyledContainer>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 25rem;
`;
