"use client";

import { Button, Divider, List, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type ACTIVE =
  | "invoices"
  | "courses"
  | "teachers"
  | "categories"
  | "overview"
  | "courseTag"
  | "courseLessons";

export function SideBar() {
  const nav = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("overview");

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
          isActive={selectedMenu === "overview"}
          style={{ width: "100%" }}
          onClick={() => handleNavigateTo("overview")}
        >
          OVERVIEW
        </Button>
      </ListItem>
      <Divider />
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
          isActive={selectedMenu === "courses"}
          onClick={() => handleNavigateTo("courses")}
          style={{ width: "100%" }}
        >
          COURSE
        </Button>
      </ListItem>
      <Divider />
      <ListItem>
        <Button
          isActive={selectedMenu === "courseTag"}
          onClick={() => handleNavigateTo("courseTag")}
          style={{ width: "100%" }}
        >
          COURSE TAG
        </Button>
      </ListItem>
      <ListItem>
        <Button
          isActive={selectedMenu === "courseLessons"}
          onClick={() => handleNavigateTo("courseLessons")}
          style={{ width: "100%" }}
        >
          COURSE LESSON
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
