import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import useFetch from "../../Hooks/useGet";
import CarsGrid from "../Cars/CarsGrid";

const Bids = () => {
  const { loading, data, setData } = useFetch("/user/bids");

  return (
    <Box px={28} py={8}>
      <Heading textAlign={"left"}>Your Bids</Heading>
      <CarsGrid carsData={data?.docs || []} setData={setData} loading={loading} />
    </Box>
  );
};

export default Bids;
