import { TableCaption, Th, Thead, Tr } from "@chakra-ui/react";

export default function InvoiceTableHeader() {
  return (
    <>
      <TableCaption>Invoices</TableCaption>
      <Thead>
        <Tr>
          <Th>Invoice #</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Thead>
    </>
  );
}
