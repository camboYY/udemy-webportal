"use client";
import { IInvoice } from "@/types";
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
} from "@chakra-ui/react";
import { ShowModalInvoice } from "./ShowModalInvoice";

export function InvoiceList({ list }: { list: IInvoice[] }) {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="teal" size="md">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Created Date</Th>
            <Th>Note</Th>
            <Th isNumeric>Qty</Th>
            <Th isNumeric>Unit Price</Th>
            <Th isNumeric>Total</Th>
            <Th>Status</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((x, i) => (
            <Tr key={i}>
              <Td>{x.id}</Td>
              <Td>{x.createdAt}</Td>
              <Td>{x.name}</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>{x.totalAmount}</Td>
              <Td>PENDING</Td>
              <Td>
                <ButtonGroup>
                  <Button>Pay Now</Button>
                  <ShowModalInvoice />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
