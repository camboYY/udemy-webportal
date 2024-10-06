import { SideBar } from "@/components";
import { Metadata } from "next";
import { ReactNode } from "react";

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          paddingBottom: 10,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
