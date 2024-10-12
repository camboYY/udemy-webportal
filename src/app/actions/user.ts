"use server";

import { getToken } from "../_lib/lib";

export async function getUsers() {
  const token = await getToken();
  try {
    let userList = await fetch("http://103.252.119.85:8080/api/users/list", {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      }),
      mode: "no-cors",
    });
    let users = await userList.json();
    return users;
  } catch (e) {
    console.log(e);
  }
}

export async function getListOfRequestingUpgradingUserRole() {
  const token = await getToken();
  try {
    const listOfUserRequestingNewRole = await fetch(
      "http://103.252.119.85:8080/api/admins/getListOfUserRequestingNewRole",
      {
        method: "GET",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        }),
        mode: "no-cors",
      }
    );
    const list = await listOfUserRequestingNewRole.json();

    return list;
  } catch (e) {
    throw e;
  }
}

export async function upgradeRole(props: { role: string; userId: number }) {
  const token = await getToken();
  try {
    const result = await fetch(
      "http://103.252.119.85:8080/api/admins/upgradeRole",
      {
        method: "POST",
        body: JSON.stringify({ ...props }),
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        }),
        mode: "no-cors",
      }
    );
    await result.json();
    const list = await getListOfRequestingUpgradingUserRole();
    return list;
  } catch (e) {
    throw e;
  }
}
