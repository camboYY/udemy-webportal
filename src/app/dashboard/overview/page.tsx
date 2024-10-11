import {
  getListOfRequestingUpgradingUserRole,
  upgradeRole,
} from "@/app/actions";
import { UserRequestingNewListRoles } from "@/components";
import { TableContainer } from "@chakra-ui/react";

export default async function Overview() {
  const list = await getListOfRequestingUpgradingUserRole();
  if (list.errors)
    return (
      <TableContainer>
        <h3>Protected Page</h3>
      </TableContainer>
    );

  return <UserRequestingNewListRoles upgradingRole={upgradeRole} list={list} />;
}
