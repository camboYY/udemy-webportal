"use client";
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { useToast } from "@chakra-ui/react";
import { ICategoryFormProp, ICourseFormProp, User } from "@/types";

export function CourseForm({
  onCreate,
  users,
  categories,
}: {
  onCreate: (props: ICourseFormProp) => Promise<void>;
  users: User[];
  categories: ICategoryFormProp[];
}) {
  const toast = useToast({ position: "top" });
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const initialValues: ICourseFormProp = {
    title: "",
    price: 0,
    courseBy: 0,
    categoryId: 0,
    createdBy: 0,
    courseInclude: "",
    courseLearning: "",
    status: false,
    thumbnailUrl: "",
  };

  const onSubmit = useCallback(
    async (
      values: ICourseFormProp,
      formikHelpers: FormikHelpers<ICourseFormProp>
    ) => {
      const { resetForm } = formikHelpers;
      setLoading(true);
      try {
        await onCreate({ ...values, thumbnailUrl });
        toast({
          title: "Course created.",
          description: "Your course has been created!",
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
    [onCreate, toast, thumbnailUrl]
  );

  const courseSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    price: Yup.number()
      .min(1, "At least 1 $")
      .max(1000, "Too Long!")
      .required("Required"),
    courseBy: Yup.number().nullable(),
    courseInclude: Yup.string().required("required."),
    courseLearning: Yup.string().required("required"),
    satus: Yup.boolean().optional(),
    categoryId: Yup.number().required("Required"),
    createdBy: Yup.number().required("Required"),
    thumbnailUrl: Yup.string().optional(),
  });

  const handleUploadImage = useCallback(
    async (file: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
      formData.append("file", (file?.target?.files as FileList)[0]);
      const imageUrl = await fetch(
        "https://api.bytescale.com/v2/accounts/12a1z7W/uploads/form_data",
        {
          headers: {
            Authorization: "Bearer public_12a1z7W2SXA8KAA2gf6traGP1kwF",
          },
          method: "POST",
          body: formData,
        }
      );

      const image = await imageUrl.json();

      const fileUrl = image.files[0].fileUrl;
      setThumbnailUrl(fileUrl);
    },
    []
  );

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={courseSchema}
      initialValues={initialValues}
    >
      {({
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        values: {
          title,
          price,
          courseBy,
          courseInclude,
          courseLearning,
          status,
          categoryId,
          createdBy,
          thumbnailUrl,
        },
      }) => {
        return (
          <StyledContainer>
            <Input
              style={{ marginBottom: 15 }}
              name="thumbnailUrl"
              id="upload"
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleUploadImage}
              placeholder="upload your thumbnail"
            />
            <form onSubmit={handleSubmit}>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.title && touched.title)}
              >
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
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
                isInvalid={!!(errors.price && touched.price)}
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  >
                    $
                  </InputLeftElement>

                  <Input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={price}
                  />
                </InputGroup>
                {errors.price && touched.price ? (
                  <FormErrorMessage>{errors?.price}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.courseInclude && touched.courseInclude)}
              >
                <Textarea
                  name="courseInclude"
                  placeholder="Course Include"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={courseInclude}
                  size="sm"
                />
                {errors.courseInclude && touched.courseInclude ? (
                  <FormErrorMessage>{errors?.courseInclude}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.courseLearning && touched.courseLearning)}
              >
                <Textarea
                  name="courseLearning"
                  placeholder="Course Learning"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={courseLearning}
                  size="sm"
                />
                {errors.courseLearning && touched.courseLearning ? (
                  <FormErrorMessage>{errors?.courseLearning}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.categoryId && touched.categoryId)}
              >
                <Select
                  placeholder="Select Category"
                  name="categoryId"
                  value={categoryId}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {categories.length > 0
                    ? categories.map((x, i) => (
                        <option key={i} value={x.id}>
                          {x.name}
                        </option>
                      ))
                    : null}
                </Select>
                {errors.categoryId && touched.categoryId ? (
                  <FormErrorMessage>{errors?.categoryId}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.status && touched.status)}
              >
                <Checkbox
                  value={status ? 1 : 0}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  colorScheme="red"
                  name="satus"
                >
                  Publish Now
                </Checkbox>
                {errors.status && touched.status ? (
                  <FormErrorMessage>{errors?.status}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.courseBy && touched.courseBy)}
              >
                <Select
                  placeholder="Select Trainer"
                  name="courseBy"
                  value={courseBy}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {users.length > 0
                    ? users.map((x, i) => (
                        <>
                          <option key={i} value={x.id}>
                            {x.name}
                          </option>
                        </>
                      ))
                    : null}
                </Select>
                {errors.courseBy && touched.courseBy ? (
                  <FormErrorMessage>{errors?.courseBy}</FormErrorMessage>
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
                        <>
                          <option key={i} value={x.id}>
                            {x.name}
                          </option>
                        </>
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
            </form>
          </StyledContainer>
        );
      }}
    </Formik>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 25rem;
`;
