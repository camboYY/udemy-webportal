"use client";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { ILoginFormProp } from "@/types";

export function LoginForm({
  login,
}: {
  login: (props: ILoginFormProp) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const initialValues: ILoginFormProp = {
    username: "",
    password: "",
  };

  const onSubmit = useCallback(
    async (values: ILoginFormProp) => {
      const { username, password } = values;
      setLoading(true);
      try {
        const sign = await login({ username, password });
        console.log({ sign });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

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
        values: { username, password },
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledLogin>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.username && touched.username)}
              >
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={username}
                />
                {errors.username && touched.username ? (
                  <FormErrorMessage>{errors?.username}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                isInvalid={!!(errors.password && touched.password)}
                style={{ marginBottom: 15 }}
              >
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={password}
                />
                {errors.password && touched.password ? (
                  <FormErrorMessage>{errors?.password}</FormErrorMessage>
                ) : null}
              </FormControl>

              <Button isLoading={loading} type="submit">
                Login
              </Button>
            </StyledLogin>
          </form>
        );
      }}
    </Formik>
  );
}

const StyledLogin = styled.div`
  min-height: 100px;
  min-width: 500px;
  background-color: #f0f8ff83;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 5px 4px #43464983;
`;
