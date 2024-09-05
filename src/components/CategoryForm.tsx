"use client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { ICategoryFormProp } from "@/types";

export function CategoryForm({
  onCreate,
}: {
  onCreate: (props: ICategoryFormProp) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategoryFormProp[]>([]);

  const initialValues: ICategoryFormProp = {
    name: "",
    parentId: "",
  };

  const onSubmit = useCallback(
    async (values: ICategoryFormProp) => {
      setLoading(true);
      try {
        await onCreate({ ...values });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [onCreate]
  );

  const loginSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    parentId: Yup.number().optional(),
  });

  useEffect(() => {
    fetch("http://103.252.119.85:8080/api/categories").then(async (res) => {
      const foundCategories = await res.json();
      setCategories(foundCategories);
    });
  }, []);

  return (
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
        values: { name, parentId },
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledContainer>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.name && touched.name)}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Category name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={name}
                />
                {errors.name && touched.name ? (
                  <FormErrorMessage>{errors?.name}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                isInvalid={!!(errors.parentId && touched.parentId)}
                style={{ marginBottom: 15 }}
              >
                <Select placeholder="Select parentId" value={parentId}>
                  {categories.length > 0 ? (
                    categories.map((x) => (
                      <>
                        <option value="option1">{x.name}</option>
                      </>
                    ))
                  ) : (
                    <option value="0">default parent cateogry</option>
                  )}
                </Select>
                {errors.parentId && touched.parentId ? (
                  <FormErrorMessage>{errors?.parentId}</FormErrorMessage>
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
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 25rem;
`;
