import React, { useState } from "react";
import { createContext, useEffect } from "react";
import { setAuthToken } from "../services/apis";
import { useDisclosure } from "@chakra-ui/react";

export const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setisAuth(true);
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (!isAuth) {
      setAuthToken(null);
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{ isOpenLoginModal, onOpenLoginModal, onCloseLoginModal, isAuth, setisAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;
