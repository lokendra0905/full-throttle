import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Img,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLinks } from "../Constants/constants";
import { Link, useNavigate } from "react-router-dom";
import GetStartedModal from "./GetStartedModal";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpenLoginModal, onOpenLoginModal, onCloseLoginModal, isAuth, setisAuth } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    setisAuth(false);
    toast({ status: "success", title: "Logout Success" });
  };

  return (
    <Box>
      <Flex
        bg={"#6504b5"}
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 16 }}
        align={"center"}
        boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <HStack flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Box cursor={"pointer"}>
            <Img src="/assets/logo.png" width={"180px"} onClick={handleLogoClick} />
          </Box>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav isAuth={isAuth} />
          </Flex>
        </HStack>

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          {isAuth ? (
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontWeight={600}
              colorScheme="white"
              cursor={"pointer"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontWeight={600}
              colorScheme="white"
              cursor={"pointer"}
              onClick={onOpenLoginModal}
            >
              Get Started
            </Button>
          )}
        </Stack>
      </Flex>
      {isOpenLoginModal && (
        <GetStartedModal isOpen={isOpenLoginModal} onClose={onCloseLoginModal} />
      )}
      <Collapse in={isOpen} animateOpacity>
        <MobileNav isAuth={isAuth} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ isAuth }) => {
  return (
    <Stack direction={"row"} spacing={6}>
      {NavLinks.map((navItem) => (
        <Link to={navItem.route} key={navItem.label}>
          <Box
            display={navItem.isPrivate ? (isAuth ? "block" : "none") : "block"}
            fontWeight={500}
            color={"gray.100"}
            _hover={{
              color: "gray.200",
            }}
          >
            {navItem.label}
          </Box>
        </Link>
      ))}
    </Stack>
  );
};

const MobileNav = ({ isAuth }) => {
  return (
    <Stack bg={"#6504b5"} p={4} display={{ md: "none" }}>
      {NavLinks.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} isAuth={isAuth} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, route, isPrivate, isAuth }) => {
  return (
    <Stack spacing={4} display={isPrivate ? (isAuth ? "block" : "none") : "block"}>
      <Link to={route}>
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
      </Link>
    </Stack>
  );
};
