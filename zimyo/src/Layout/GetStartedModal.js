import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Controller, useForm } from "react-hook-form";
import usePost from "../Hooks/usePost";
import { setAuthToken } from "../services/apis";
import { AuthContext } from "../Context/AuthContext";

const GetStartedModal = ({ isOpen, onClose }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { email: "", password: "", name: "" },
  });
  const toast = useToast();
  const [isLogin, setIslogin] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { postData, loading } = usePost(isLogin ? "/user/login" : "/user/register");
  const { setisAuth } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const userData = await postData(data);
      if (userData) {
        setAuthToken(userData.token);
        onClose();
        toast({ status: "success", title: "Login Successfully" });
        setisAuth(true);
      }
    } catch (err) {
      toast({ status: "warning", title: err });
    }
  };

  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Get Started</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                {!isLogin && (
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <FormControl id="name" isRequired {...field}>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" />
                      </FormControl>
                    )}
                  />
                )}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <FormControl id="email" isRequired {...field}>
                      <FormLabel>Email address</FormLabel>
                      <Input type="email" />
                    </FormControl>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormControl id="password" isRequired {...field}>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input type={showPassword ? "text" : "password"} />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() => setShowPassword((showPassword) => !showPassword)}
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  )}
                />

                <Stack spacing={10} pt={2}>
                  <Button size="md" colorScheme="purple" type="submit" isLoading={loading}>
                    {isLogin ? "Sign In" : "Sign Up"}
                  </Button>
                </Stack>
              </Stack>
            </form>
            {isLogin ? (
              <Text align={"center"} py={3} onClick={() => setIslogin(false)}>
                do not have account? <Link color={"blue.400"}>Sign Up</Link>
              </Text>
            ) : (
              <Text align={"center"} py={3} onClick={() => setIslogin(true)}>
                Already a user? <Link color={"blue.400"}>Sign In</Link>
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default GetStartedModal;
