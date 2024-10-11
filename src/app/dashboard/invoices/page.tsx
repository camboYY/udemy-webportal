import { getInvoices } from "@/app/actions";
import { InvoiceList } from "@/components/InvoiceList";
import { TableContainer } from "@chakra-ui/react";

export default async function Invoices() {
  const list = await getInvoices({ page: 1 });

  if (list?.errors)
    return (
      <TableContainer>
        <h3>Protected Page</h3>
      </TableContainer>
    );

  return <InvoiceList list={list} />;
}
