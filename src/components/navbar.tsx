import { Box, HStack, Spacer } from "@chakra-ui/react";
import React from "react";

export function Navbar() {
  return (
    <Box w="100%" h="50px" bgGradient="linear(to-l,#009FC1, #FFFFFF)">
      <HStack marginRight={5} height={50}>
        <Spacer />
      </HStack>
    </Box>
  );
}
