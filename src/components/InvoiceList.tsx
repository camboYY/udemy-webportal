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

export function InvoiceList() {
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
          <Tr>
            <Td>0001</Td>
            <Td>24-09-2024</Td>
            <Td>inches</Td>
            <Td isNumeric>2</Td>
            <Td isNumeric>1</Td>
            <Td isNumeric>25.4</Td>
            <Td>PENDING</Td>
            <Td>
              <ButtonGroup>
                <Button>Pay Now</Button>
                <ShowModalInvoice />
              </ButtonGroup>
            </Td>
          </Tr>
          <Tr>
            <Td>0002</Td>
            <Td>02-09-2024</Td>
            <Td>inches</Td>
            <Td isNumeric>2</Td>
            <Td isNumeric>1</Td>
            <Td isNumeric>25.4</Td>
            <Td>PAID</Td>
            <Td>
              <ButtonGroup>
                <Button>Paid</Button>
                <ShowModalInvoice />
              </ButtonGroup>
            </Td>
          </Tr>
          <Tr>
            <Td>0003</Td>
            <Td>25-09-2024</Td>
            <Td>inches</Td>
            <Td isNumeric>2</Td>
            <Td isNumeric>10</Td>
            <Td isNumeric>100.4</Td>
            <Td>PENDING</Td>
            <Td>
              <ButtonGroup>
                <ShowModalInvoice />
              </ButtonGroup>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
