import { Box, Heading, HStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import useFetch from "../../Hooks/useGet";
import CarsGrid from "./CarsGrid";
import Pagination from "../../Common/Pagination";
import { AuthContext } from "../../Context/AuthContext";
import ListNewCar from "./ListNewCar/ListNewCar";

const Cars = () => {
  const [page, setPage] = useState(1);
  const { loading, data, setData } = useFetch("/cars", { page }, [page]);
  const { isAuth } = useContext(AuthContext);

  return (
    <Box px={28} py={8}>
      <HStack justify={"space-between"}>
        <Heading textAlign={"left"}>All Cars</Heading>
        {isAuth && <ListNewCar />}
      </HStack>
      <CarsGrid carsData={data?.docs || []} setData={setData} loading={loading} />
      <Pagination page={page} setPage={setPage} totalPages={data?.totalPages} />
    </Box>
  );
};

export default Cars;
