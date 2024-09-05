"use client";

import { Button, Divider, List, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

type ACTIVE = "invoices" | "payments" | "products" | "teachers" | "categories";

export function SideBar() {
  const nav = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleNavigateTo = useCallback(
    (path: ACTIVE) => {
      setSelectedMenu(path);
      nav.push(`/dashboard/${path}`);
    },
    [nav]
  );

  return (
    <List>
      <ListItem>
        <Button
          isActive={selectedMenu === "invoices"}
          onClick={() => handleNavigateTo("invoices")}
          style={{ width: "100%" }}
        >
          INVOICES
        </Button>
      </ListItem>
      <Divider />
      <ListItem>
        <Button
          isActive={selectedMenu === "payments"}
          onClick={() => handleNavigateTo("payments")}
          style={{ width: "100%" }}
        >
          PAYMENTS
        </Button>
      </ListItem>
      <ListItem>
        <Button
          isActive={selectedMenu === "categories"}
          onClick={() => handleNavigateTo("categories")}
          style={{ width: "100%" }}
        >
          CATEGORIES
        </Button>
      </ListItem>
      <Divider />
      <ListItem>
        <Button
          isActive={selectedMenu === "products"}
          onClick={() => handleNavigateTo("products")}
          style={{ width: "100%" }}
        >
          PRODUCTS
        </Button>
      </ListItem>
      <Divider />
      <ListItem>
        <Button
          isActive={selectedMenu === "teachers"}
          onClick={() => handleNavigateTo("teachers")}
          style={{ width: "100%" }}
        >
          TEACHERS
        </Button>
      </ListItem>
    </List>
  );
}
