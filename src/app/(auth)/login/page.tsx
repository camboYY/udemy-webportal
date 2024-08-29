"use client";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const onSubmit = (values: LoginForm) => {
    console.log({ values });
  };

  const initialValues: LoginForm = {
    username: "",
    password: "",
  };

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

              <Button type="submit">Login</Button>
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
