import { Divider, List, ListItem } from "@chakra-ui/react";
import React, { ReactNode } from "react";

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
  let isLogin = true;

  return isLogin ? (
    <div
      style={{ display: "flex", borderWidth: 1, borderColor: "ActiveCaption" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "13%",
        }}
      >
        <List>
          <ListItem>
            ORDERS
            <Divider />
          </ListItem>

          <ListItem>
            PAYMENTS <Divider />
          </ListItem>
          <ListItem>
            TEACHERS <Divider />
          </ListItem>
          <ListItem></ListItem>
        </List>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  ) : (
    <>
      <h1>{children}</h1>

      <div>{login}</div>
    </>
  );
}
