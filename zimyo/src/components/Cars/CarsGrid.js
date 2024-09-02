import { Box, Center, Grid, Spinner } from "@chakra-ui/react";
import React from "react";
import CarCard from "./CarCard";

const CarsGrid = ({ carsData, loading, setData }) => {
  return (
    <Box mt={8}>
      {loading ? (
        <Center minH={"50vh"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Center>
      ) : (
        <Grid gridTemplateColumns={"repeat(3,1fr)"} gap={6}>
          {carsData.map((car, key) => {
            return <CarCard {...car} key={key} setData={setData} />;
          })}
        </Grid>
      )}
    </Box>
  );
};

export default CarsGrid;
