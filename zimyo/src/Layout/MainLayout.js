import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </div>
  );
};

export default MainLayout;
