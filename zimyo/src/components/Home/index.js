import { Box, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Box>
      <Box backgroundColor={"black"} position={"relative"}>
        <Img
          src="https://static.vecteezy.com/system/resources/previews/039/074/815/non_2x/ai-generated-beautiful-dark-background-for-a-car-wash-advertisement-with-plenty-of-space-for-text-and-a-blurred-background-free-photo.jpeg"
          width={"100%"}
          opacity={"0.5"}
          backdropBlur={"1"}
        />
        <Box
          top={"40%"}
          bottom={"40%"}
          position={"absolute"}
          color={"white"}
          pl={"20"}
          textAlign={"left"}
          width={"50%"}
        >
          <Heading>
            Shift into High Gear: <br /> Your Next Car Awaits!
          </Heading>
          <Text>Discover, Bid, and Drive Home Your Dream Car with Full Throttle Auctions</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
