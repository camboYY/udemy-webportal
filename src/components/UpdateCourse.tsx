"use client";
import { ICourseFormProp, ICourseFormWithIdProp } from "@/types";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { ChangeEvent, useCallback, useState } from "react";

export function UpdateCourse({
  onSearchCourse,
}: {
  onSearchCourse: (qry: string) => Promise<ICourseFormWithIdProp[]>;
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

  const onSetQuery = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const onSearch = useCallback(async () => {
    setSearchLoading(true);
    const courseList = await onSearchCourse(query);
    setCourses(courseList);
    if (courseList.length === 1) {
      setCourse(courseList[0]);
    }
    if (courseList.length === 0) {
      setCourseNotFound("Course not found");
    } else {
      setCourseNotFound("");
    }
    setSearchLoading(false);
  }, [query, onSearchCourse]);

  return (
    <div style={{ marginLeft: 10 }}>
      <h1>
        <b>Search your course and update it</b>
      </h1>
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
      {courses.length > 0 ? (
        <Stack spacing={5}>
          {courses.map((cr, i) => (
            <Card key={i}>
              <CardBody
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div> {cr.title}</div>
                <ButtonGroup style={{ marginLeft: 10 }}>
                  <Button fontSize={"small"}>Edit</Button>
                  <Button fontSize={"small"}>Remove</Button>
                </ButtonGroup>
              </CardBody>
            </Card>
          ))}
        </Stack>
      ) : null}
      {courseNotFound ? <div>No record found</div> : null}
    </div>
  );
}
