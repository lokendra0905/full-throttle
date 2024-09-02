import {
  Button,
  Card,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";

const BidsModal = ({ isOpen, onClose, bids = [] }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bids History</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={"large"}> Total Bids : {bids.length} </Text>
          <Stack mt={5} spacing={3}>
            {bids?.map((bid) => {
              return (
                <Card p={4}>
                  <HStack justify={"space-between"}>
                    <Text fontWeight={"500"}>${bid.amount}</Text>
                    <Text> {moment(bid.timestamp).format("DD MMM hh:mm a")}</Text>
                  </HStack>
                </Card>
              );
            })}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BidsModal;
