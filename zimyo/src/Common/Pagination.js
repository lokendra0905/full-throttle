import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  console.log(page);
  if (!totalPages) return null;
  return (
    <Flex justify={"center"} mt={6}>
      <HStack gap={2}>
        <Button
          colorScheme="purple"
          onClick={() => setPage((prev) => prev - 1)}
          isDisabled={page === 1}
        >
          Prev
        </Button>
        <Text>
          Page {page} of {totalPages}
        </Text>
        <Button
          colorScheme="purple"
          onClick={() => setPage((prev) => prev + 1)}
          isDisabled={page === totalPages}
        >
          Next
        </Button>
      </HStack>
    </Flex>
  );
};

export default Pagination;
