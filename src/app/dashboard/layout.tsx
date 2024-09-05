import { Button, Divider, List, ListItem } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Metadata } from "next";
import { SideBar } from "@/components";

export const metadata: Metadata = {
  title: "E-learning - Dashboard",
  description: "Welcome Udemy E-learning, by udemy BBU team",
};

export default function Layout({
  children,
  revenue,
  user,
  notification,
  login,
}: {
  children: ReactNode;
  revenue: ReactNode;
  notification: ReactNode;
  user: ReactNode;
  login: ReactNode;
}) {
  return (
    <div style={{ display: "flex", backgroundColor: "whitesmoke" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "13%",
        }}
      >
        <SideBar />
      </div>
      <div
        style={{
          marginLeft: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
