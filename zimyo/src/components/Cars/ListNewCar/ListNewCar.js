import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import ListCarModal from "./ListCarModal";

const ListNewCar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="purple" onClick={onOpen} colo>
        List Car
      </Button>
      {isOpen && <ListCarModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default ListNewCar;
