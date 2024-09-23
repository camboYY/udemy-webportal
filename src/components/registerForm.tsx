"use client";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { RegisterFormProp } from "@/types";
import { useToast } from "@chakra-ui/react";

export function RegisterForm({
  onRegister,
}: {
  onRegister: (props: RegisterFormProp) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const toast = useToast({ position: "top" });

  const onSubmit = useCallback(
    async (values: RegisterFormProp) => {
      try {
        setLoading(true);

        await onRegister(values);
        toast({
          title: "Account created.",
          description: "Your registration has been success!",
          status: "success",
          duration: 9000,
        });
      } catch (e) {
        console.info(e);
      } finally {
        setLoading(false);
      }
    },
    [onRegister, toast]
  );

  const initialValues: RegisterFormProp = {
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    name: "",
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
      .optional()
      .email("Must be email format")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    phoneNumber: Yup.string()
      .min(10, "Too Short!")
      .max(13, "Too Long!")
      .required("Required"),
    name: Yup.string()
      .min(5, "Too Short!")
      .max(30, "Too Long!")
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
        values: { username, password, email, phoneNumber, name },
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledRegister>
              <FormControl
                style={{ marginBottom: 15 }}
                isInvalid={!!(errors.name && touched.name)}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={name}
                />
                {errors.name && touched.name ? (
                  <FormErrorMessage>{errors?.name}</FormErrorMessage>
                ) : null}
              </FormControl>
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
              <Button isLoading={loading} type="submit">
                Register
              </Button>
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
