"use client";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";

type RegisterForm = {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export default function Register() {
  const onSubmit = (values: RegisterForm) => {
    console.log({ values });
  };

  const initialValues: RegisterForm = {
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
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
    email: Yup.string()
      .email("Must be email format")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .min(10, "Too Short!")
      .max(13, "Too Long!")
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
        handleSubmit,
        touched,
        handleBlur,
        handleChange,
        values: { username, password, email, phoneNumber },
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledRegister>
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
              <FormControl
                isInvalid={!!(errors.password && touched.password)}
                style={{ marginBottom: 15 }}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={email}
                />
                {errors.password && touched.password ? (
                  <FormErrorMessage>{errors?.password}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                isInvalid={!!(errors.password && touched.password)}
                style={{ marginBottom: 15 }}
              >
                <Input
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={phoneNumber}
                />
                {errors.password && touched.password ? (
                  <FormErrorMessage>{errors?.password}</FormErrorMessage>
                ) : null}
              </FormControl>
              <Button type="submit">Register</Button>
            </StyledRegister>
          </form>
        );
      }}
    </Formik>
  );
}

const StyledRegister = styled.div`
  min-height: 100px;
  min-width: 500px;
  background-color: #f0f8ff83;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 5px 4px #43464983;
`;
