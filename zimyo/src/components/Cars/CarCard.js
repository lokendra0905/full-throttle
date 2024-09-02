import React, { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  HStack,
  Img,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PiClockCountdownLight } from "react-icons/pi";
import useCountdown from "../../Hooks/useCountDown";
import BidsModal from "./BidsModal";
import NewBidModal from "./NewBidModal";

const CarCard = ({
  _id,
  images,
  make,
  model,
  auctionEndTime,
  mileage,
  setData,
  year,
  bidHistory,
  currentBid,
  userBid,
}) => {
  const { days, hours, minutes } = useCountdown(auctionEndTime);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenNewBidModal,
    onOpen: onOpenNewBidModal,
    onClose: onCloseNewBidModal,
  } = useDisclosure();

  const timeLeft = useMemo(() => {
    let formattedTime = [];
    if (days > 0) {
      formattedTime.push(`${days} day${days > 1 ? "s" : ""}`);
    }
    if (hours > 0) {
      formattedTime.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    }
    if (days === 0 && hours === 0 && minutes === 0) {
      formattedTime.push("Sold");
    }
    return formattedTime.join(" ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionEndTime]);

  console.log(bidHistory);

  return (
    <Card variant={"outline"} overflow={"hidden"}>
      <Box position={"relative"} backgroundColor={"black"}>
        <Img src={images[0]} width={"100%"} height={"200px"} _hover={{ opacity: 0.5 }} />
        <Tag position={"absolute"} bottom={2} left={2} colorScheme="purple">
          <TagLabel>
            <HStack>
              <PiClockCountdownLight fontSize={"16px"} /> <Text>{timeLeft}</Text>
            </HStack>
          </TagLabel>
        </Tag>
      </Box>
      <Box textAlign={"left"} padding={4}>
        <Text fontSize={"large"} fontWeight={500}>
          {make} - {model}
        </Text>
        <Text> {`${mileage} miles, ${year} `}</Text>
        <Text> Current Bid : ${currentBid} </Text>
        {userBid && <Text> Your Bid : ${userBid.amount} </Text>}
        <HStack justify={"space-between"} mt={2}>
          <Button flex={1} colorScheme="purple" onClick={onOpenNewBidModal}>
            Place Bid
          </Button>
          <Button flex={1} colorScheme="red" onClick={onOpen}>
            View Bids
          </Button>
        </HStack>
      </Box>
      {isOpenNewBidModal && (
        <NewBidModal
          isOpen={isOpenNewBidModal}
          onClose={onCloseNewBidModal}
          carId={_id}
          currentBid={currentBid}
          setData={setData}
        />
      )}
      {isOpen && <BidsModal isOpen={isOpen} onClose={onClose} bids={bidHistory} />}
    </Card>
  );
};

export default CarCard;
