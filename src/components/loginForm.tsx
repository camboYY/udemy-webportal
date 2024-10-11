"use client";
import { ILoginFormProp } from "@/types";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";

export function LoginForm({
  login,
}: {
  login: (props: ILoginFormProp) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const toast = useToast({ position: "top" });
  const initialValues: ILoginFormProp = {
    username: "",
    password: "",
  };

  const onSubmit = useCallback(
    async (values: ILoginFormProp) => {
      const { username, password } = values;
      setLoading(true);
      try {
        await login({ username, password });
      } catch (e) {
        console.log(e);
        toast({
          title: "logged in.",
          description: "Your failed",
          status: "error",
          duration: 9000,
        });
      } finally {
        setLoading(false);
      }
    },
    [login, toast]
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
