import React, { useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import usePost from "../../../Hooks/usePost";

const ListCarModal = ({ isOpen, onClose }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      make: "",
      model: "",
      price: "",
      auctionEndTime: "",
      mileage: "",
      year: "",
      description: "",
    },
  });
  const toast = useToast();
  const fileRef = useRef();
  const { postData, loading } = usePost("/cars/new");
  const [images, setImages] = useState([]);

  const onSubmit = async (data) => {
    try {
      const response = await postData({ ...data, images });
      console.log(response);
      onClose();
      toast({ status: "success", title: "Added Successfully" });
    } catch (err) {
      toast({ status: "warning", title: err });
    }
  };

  const handleBtnClick = () => {
    fileRef.current.click();
  };

  const handleUpload = (e) => {
    const data = new FormData();
    const file = e.target.files[0];
    if (file) {
      data.append("file", file);
      data.append("upload_preset", "atwdlvty");
      data.append("cloud_name", "dho03uvkn");

      fetch("https://api.cloudinary.com/v1_1/dho03uvkn/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImages((prev) => [...prev, data?.url]);
        })
        .catch((err) => {
          toast({ status: "error", title: "Upload Failed" });
        });
    }
  };

  const openImage = (link) => {
    window.open(link, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody maxH={"500px"} overflowY={"scroll"}>
              <Stack spacing={4}>
                <Button onClick={handleBtnClick}> Upload Image</Button>
                {images.map((image) => (
                  <Text
                    fontSize={"sm"}
                    maxWidth={"100%"}
                    cursor={"pointer"}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                    onClick={() => openImage(image)}
                  >
                    {image}
                  </Text>
                ))}
                <Input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  display={"none"}
                />
                <Controller
                  name="make"
                  control={control}
                  render={({ field }) => (
                    <FormControl isRequired {...field}>
                      <FormLabel>Brand</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  )}
                />
                <Controller
                  name="model"
                  control={control}
                  render={({ field }) => (
                    <FormControl isRequired {...field}>
                      <FormLabel>Model</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <FormControl isRequired {...field}>
                      <FormLabel>Price</FormLabel>
                      <Input type="number" />
                    </FormControl>
                  )}
                />
                <Controller
                  name="mileage"
                  control={control}
                  render={({ field }) => (
                    <FormControl isRequired {...field}>
                      <FormLabel>Mileage (in miles/liter)</FormLabel>
                      <Input type="number" />
                    </FormControl>
                  )}
                />
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <FormControl isRequired {...field}>
                      <FormLabel>Year</FormLabel>
                      <Input type="number" />
                    </FormControl>
                  )}
                />

                <Controller
                  name="auctionEndTime"
                  control={control}
                  render={({ field }) => (
                    <FormControl isRequired {...field}>
                      <FormLabel>Auction End Date</FormLabel>
                      <Input type="date" />
                    </FormControl>
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <FormControl {...field}>
                      <FormLabel>Description</FormLabel>
                      <Textarea />
                    </FormControl>
                  )}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                size="md"
                width={"full"}
                colorScheme="purple"
                type="submit"
                isLoading={loading}
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </ModalOverlay>
    </Modal>
  );
};

export default ListCarModal;
