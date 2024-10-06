"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { InvoiceDetailTable } from "./InvoiceDetailTable";

export function ShowModalInvoice() {
  const contentRef = useRef<HTMLTableElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Detail</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invoice Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InvoiceDetailTable contentRef={contentRef} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => reactToPrintFn()} variant="ghost">
              Print
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
