import { Box, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { LogoutButton } from "./logoutButton";
import { logout } from "@/app/actions/auth";
import { getSession } from "@/app/_lib/lib";

export async function Navbar() {
  const isLoggedIn = await getSession();
  return (
    <Box w="100%" h="50px" bgGradient="linear(to-l,#009FC1, #FFFFFF)">
      <HStack marginRight={5} height={50}>
        <Spacer />
        {!!isLoggedIn ? <LogoutButton logout={logout} /> : null}
      </HStack>
    </Box>
  );
}
