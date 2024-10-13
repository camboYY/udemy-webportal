"use client";
import {
  ICourseFormProp,
  ICourseFormWithIdProp,
  ICourseLesson,
  User,
} from "@/types";
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Input,
  Progress,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Formik, FormikHelpers } from "formik";
import React, { ChangeEvent, useCallback, useState } from "react";
import * as Yup from "yup";
import { CourseCard } from "./CourseCard";

export function CourseLessonForm({
  onCreate,
  onSearchCourse,
  users,
}: {
  onCreate: (props: ICourseLesson) => Promise<void>;
  onSearchCourse: (course?: string) => Promise<ICourseFormWithIdProp[]>;
  users: User[];
}) {
  const toast = useToast({ position: "top" });
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [courseNotFound, setCourseNotFound] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

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
  const initialValues: ICourseLesson = {
    title: "",
    courseId: 0,
    description: "",
    videoUrl: "",
    status: false,
    createdBy: 0,
  };

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

  const fetchingVideoUrl = useCallback(async ({ uid }: { uid: string }) => {
    try {
      const uploadUrl = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/b6563a58441e13961e89a7cbc2cec3b3/stream/${uid}`,
        {
          headers: {
            Authorization: `Bearer qYTKmUiikUAT1_bJdk-8ppHeIjsiQMRJ9ouUTo9J`,
          },
        }
      );
      const {
        result: { preview },
      } = await uploadUrl.json();
      setVideoUrl(preview);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleUploadVideo = useCallback(
    async ({
      videoFile,
      uploadURL,
      uid,
    }: {
      videoFile: File;
      uploadURL: string;
      uid: string;
    }) => {
      try {
        setUploadLoading(true);
        const formData = new FormData();
        formData.append("file", videoFile);
        await fetch(`${uploadURL}`, {
          headers: {
            Authorization: `Bearer qYTKmUiikUAT1_bJdk-8ppHeIjsiQMRJ9ouUTo9J`,
          },
          method: "POST",
          body: formData,
          mode: "no-cors",
        });
        await fetchingVideoUrl({ uid });
      } catch (e) {
        console.log(e);
      } finally {
        setUploadLoading(false);
      }
    },
    [fetchingVideoUrl]
  );

  const onUploadFile = useCallback(
    async (fileInput: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const getUploadUrl = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/b6563a58441e13961e89a7cbc2cec3b3/stream/direct_upload`,
          {
            headers: {
              Authorization: "Bearer vmrZjHrDkPvPgWCSUFlIMyJ7VWe5E0m-rfF9q5vD",
            },
            method: "POST",
            body: JSON.stringify({
              maxDurationSeconds: 3600,
            }),
          }
        );

        const {
          result: { uploadURL, uid },
        } = await getUploadUrl.json();

        const videoFile = (fileInput.target.files as FileList)[0];

        const formData = new FormData();
        formData.append("file", videoFile);
        await handleUploadVideo({ videoFile, uploadURL, uid });
      } catch (e) {
        console.log(e);
      }
    },
    [handleUploadVideo]
  );

  const onSetQuery = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (
      values: ICourseLesson,
      { resetForm }: FormikHelpers<ICourseLesson>
    ) => {
      setLoading(true);

      try {
        await onCreate({
          ...values,
          courseId: Number(course?.id),
          videoUrl: videoUrl,
        });
        toast({
          title: "Course Lesson created.",
          description: "Your Course lesson has been created!",
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
    [onCreate, toast, course, videoUrl]
  );

  const loginSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(1000, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(1000, "Too Long!")
      .required("Required"),
    videoUrl: Yup.string().optional(),
    satus: Yup.boolean().default(false),
    createdBy: Yup.number().required("Required"),
    courseId: Yup.number().required("Required"),
  });

  console.log({ users });
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
          values: { title, description, createdBy, status },
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <StyledContainer>
                {courses.length > 0 && (
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
                    placeholder="Course lesson title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={title}
                  />
                  {errors.title && touched.title ? (
                    <FormErrorMessage>{errors?.title}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  style={{ marginBottom: 15 }}
                  isInvalid={!!(errors.description && touched.description)}
                >
                  <Textarea
                    name="description"
                    placeholder="Course description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={description}
                    size="sm"
                  />
                  {errors.description && touched.description ? (
                    <FormErrorMessage>{errors?.description}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  style={{ marginBottom: 15 }}
                  isInvalid={!!(errors.videoUrl && touched.videoUrl)}
                >
                  <Uploading>
                    Upload Image
                    <Input
                      type="file"
                      name="videoUrl"
                      placeholder="video link"
                      onBlur={handleBlur}
                      onChange={onUploadFile}
                      className="file-upload"
                    />
                  </Uploading>
                  {uploadLoading ? (
                    <Progress hasStripe size="xs" isIndeterminate />
                  ) : null}

                  {errors.videoUrl && touched.videoUrl ? (
                    <FormErrorMessage>{errors?.videoUrl}</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  style={{ marginBottom: 15 }}
                  isInvalid={!!(errors.status && touched.status)}
                >
                  <Checkbox
                    name="status"
                    value={status ? 1 : 0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    colorScheme="red"
                  >
                    Publish Now
                  </Checkbox>
                  {errors.status && touched.status ? (
                    <FormErrorMessage>{errors?.status}</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  isInvalid={!!(errors.createdBy && touched.createdBy)}
                  style={{ marginBottom: 15 }}
                >
                  <Select
                    placeholder="Select Author"
                    name="createdBy"
                    value={createdBy}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {users.length > 0
                      ? users.map((x, i) => (
                          <option key={i} value={x.id}>
                            {x.name}
                          </option>
                        ))
                      : null}
                  </Select>
                  {errors.createdBy && touched.createdBy ? (
                    <FormErrorMessage>{errors?.createdBy}</FormErrorMessage>
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

const Uploading = styled.label`
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  border-radius: 4px;

  .file-upload {
    display: none; /* Hide the original file input */
  }
`;
