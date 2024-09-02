import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import usePost from "../../Hooks/usePost";

const NewBidModal = ({ isOpen, onClose, currentBid, carId, setData }) => {
  const { control, handleSubmit, watch } = useForm();
  const toast = useToast();
  const { postData, loading } = usePost(`/cars/${carId}/bid`);

  const NewBid = watch("amount");

  const onSubmit = async (data) => {
    try {
      const newData = await postData(data);
      console.log(newData);
      setData((prev) => ({
        ...prev,
        docs: prev.docs.map((car) => (car._id === carId ? newData.car : car)),
      }));
      onClose();
      toast({ status: "success", title: "Bid Placed" });
    } catch (err) {
      toast({ status: "warning", title: err });
    }
  };

  console.log(NewBid);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Bids History</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"500"} fontSize={"large"}>
              Current Bid : {currentBid}
            </Text>
            <Box mt={5}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <FormControl
                    id="amount"
                    isRequired
                    {...field}
                    isInvalid={NewBid && NewBid <= currentBid}
                  >
                    <FormLabel>Amount</FormLabel>
                    <Input type="number" placeholder="Enter Amount Greater then Current Bid" />
                    {NewBid && NewBid <= currentBid ? (
                      <FormErrorMessage>Amount must be Greater than Current Bid</FormErrorMessage>
                    ) : (
                      <FormHelperText>Note: Amount must be Greater than Current Bid</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button colorScheme="red" onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="purple"
                type="submit"
                isLoading={loading}
                isDisabled={NewBid <= currentBid}
              >
                Place Bid
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NewBidModal;
