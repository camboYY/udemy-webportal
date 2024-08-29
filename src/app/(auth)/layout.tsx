"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const navLinks = [
  {
    name: "Register",
    href: "/register",
  },
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Forgot Password",
    href: "/forgot-password",
  },
];
export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ContainerStyled>
      <div className="listNav">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <Link href={link.href} key={link.name}>
              <BoxStyled $active={isActive}>
                <H3Styled>{link.name}</H3Styled>
              </BoxStyled>
            </Link>
          );
        })}
      </div>
      <StyleContainer>{children}</StyleContainer>
    </ContainerStyled>
  );
}

const StyleContainer = styled.section`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0px;
  flex-direction: column;
  .listNav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const H3Styled = styled.h3`
  align-self: center;
`;

const BoxStyled = styled.div<{ $active?: boolean }>`
  height: 100px;
  width: 200px;
  border-radius: 5px;
  border-width: 1;
  display: flex;
  justify-content: center;
  background: ${(props) => (props.$active ? "#3182ce" : "#cbd5e0")};
  color: ${(props) => (props.$active ? "white" : "black")};

  text-align: center;
  :hover {
    background-color: #3182ce;
    color: #fff;
  }
`;
