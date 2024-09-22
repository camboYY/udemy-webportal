"use client";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useCallback, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { ICourseFormProp, ICourseFormWithIdProp, ICourseTag } from "@/types";
import { useToast } from "@chakra-ui/react";
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
    setSearchLoading(false);
  }, [query, onSearchCourse]);

  const onSetQuery = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (values: ICourseTag) => {
      setLoading(true);
      try {
        await onCreate({ ...values, courseId: Number(course?.id) });
        toast({
          title: "Course Tag created.",
          description: "Your Course tag has been created!",
          status: "success",
          duration: 9000,
        });
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
        <Input value={query} name="course" onChange={onSetQuery} type="text" />
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
                {courses.length > 0 ? (
                  <CourseCard onChosen={onCourseChosen} courses={courses} />
                ) : (
                  <h2 style={{ marginBottom: 10 }}>Course not found</h2>
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
                    <div style={{ color: "white" }}>
                      {!!course && course?.title}
                    </div>
                  </div>
                  {errors.courseId && touched.courseId ? (
                    <FormErrorMessage>{errors?.courseId}</FormErrorMessage>
                  ) : null}
                </FormControl>

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
