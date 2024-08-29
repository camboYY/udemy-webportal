"use client";
import { Container, Text } from "@chakra-ui/react";
import React from "react";
import styled from "@emotion/styled";

export default function NotFound() {
  return (
    <Container marginLeft={20} marginRight={20}>
      <HeadStyled>Page is not found</HeadStyled>
      <Text fontSize="5xl">Oop something went wrong!</Text>
    </Container>
  );
}

const HeadStyled = styled.h1`
  font-size: 72px;
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
