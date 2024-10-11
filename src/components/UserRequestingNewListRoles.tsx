"use client";

import { NewRoleProp } from "@/types";
import {
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Confirmation } from "./Confirmation";

export function UserRequestingNewListRoles(props: NewRoleProp) {
  const toast = useToast({ position: "top" });
  const [loading, setLoading] = useState(false);

  let { upgradingRole, list: listOfUserRoles } = props;
  const [list, setList] = useState(listOfUserRoles);

  const handleSubmit = useCallback(
    async (props: { role: string; userId: number }) => {
      try {
        setLoading(true);
        const list = await upgradingRole(props);
        setList(list);
        toast({
          title: "Role upgraded",
          description: "Your upgradation has been success!",
          status: "success",
          duration: 9000,
        });
      } catch (error) {
        toast({
          title: "Role upgraded",
          description: "Your upgradation has not been success!",
          status: "error",
          duration: 9000,
        });
      } finally {
        setLoading(false);
      }
    },
    [toast, upgradingRole]
  );

  if (list.length === 0) return <h2>No Record found</h2>;

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="teal" size="md">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Full name</Th>
            <Th>E-mail</Th>
            <Th>Phone Number</Th>
            <Th>Work Experience</Th>
            <Th>Current Role</Th>
            <Th>New Role</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.length > 0 ? (
            list?.map((x, i) => (
              <Tr key={i}>
                <Td>{x.id}</Td>
                <Td>{x.name}</Td>
                <Td>{x.email}</Td>
                <Td>{x.phoneNumber}</Td>
                <Td>{x.profile.workExperience}</Td>
                <Td>{x.profile.upgradeRoleStatus}</Td>
                <Td>{x.role.name}</Td>
                <Td>
                  <ButtonGroup flexWrap={"wrap"}>
                    <Confirmation
                      loading={loading}
                      onClick={async () =>
                        await handleSubmit({
                          role: "ROLE_TEACHER",
                          userId: x.id,
                        })
                      }
                    />
                    <Button
                      onClick={async () =>
                        await handleSubmit({
                          role: "ROLE_USER",
                          userId: x.id,
                        })
                      }
                    >
                      Reject
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <td colSpan={1}>
                <h2>No Record found</h2>
              </td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
