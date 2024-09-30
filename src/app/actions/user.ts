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
    console.log({ backend: users });
    return users;
  } catch (e) {
    console.log(e);
  }
}
