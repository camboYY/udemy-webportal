import { getToken } from "../_lib/lib";

export async function getInvoices(props: { page: number }) {
  const token = await getToken();
  try {
    const fetchedInvoices = await fetch(
      "http://103.252.119.85:8080/api/admins/getPurchaseList/page/" +
        props.page,
      {
        method: "GET",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        }),
        mode: "no-cors",
      }
    );
    const invoices = await fetchedInvoices.json();
    return invoices;
  } catch (e) {
    throw e;
  }
}
