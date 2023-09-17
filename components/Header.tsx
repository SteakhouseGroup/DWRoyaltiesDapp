import {
  Flex,
  Image,
  IconButton,
  Heading,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Stack,
  ButtonGroup,
  Divider,
  Box,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  SimpleGrid,
  Text,
  VStack,
  Checkbox,
  useTheme
} from "@chakra-ui/react";
import { ConnectWallet, NATIVE_TOKEN_ADDRESS, useAddress, useBalance, useSwitchChain } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react"; // Include useMemo here
import { useRef } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { Cronos, Base, Polygon, Ethereum } from "@thirdweb-dev/chains";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { FaDiscord, FaTwitter, FaWallet } from "react-icons/fa";
import Link from "next/link";
import reDirects from "../utils/Redirects";
interface Notification {
  walletAddress: string;
  nftId: number;
  nftAddress: string;
  price: number;
  type: string;
}

interface UserData {
  walletAddress: string;
  username: string;
  profilePicture: string;
  experience: number;
  bio: string;
  email: string;
  cnsName: string;
  website: string;
  instagram: string;
  twitter: string;
  discord: string;
  favorites: string[];
  watchlists: string[];
  banner: string;
  notifications: Notification[];
}

interface HeaderProps {
  heading: string;
  bgIm: string;
}



const Header: React.FC<HeaderProps> = ({
  heading,
  bgIm,
}) => {
  const address = useAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null); // Replace HTMLButtonElement with the appropriate type
  const [profiles, setProfiles] = useState<UserData | null>(null); // Change to UserData | null
  const [activeIndex, setActiveIndex] = useState(null);

  const switchChain = useSwitchChain();
  const { data: nativeTokenData, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const MotionBox = motion(Box);
  const theme = useTheme();

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  let truncatedValue = "";
  if (nativeTokenData?.value) {
    const formattedValue = ethers.utils.formatUnits(nativeTokenData.value, 18);
    truncatedValue = `${formattedValue.split(".")[0]} ${nativeTokenData.symbol
      }`; // Add symbol after truncated value
  }

  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.vvs.finance/",
    {
      chainId: 25,
      name: "cronos-mainnet",
      ensAddress: "0x7F4C61116729d5b27E5f180062Fdfbf32E9283E5",
    }
  );

  // State to store the name
  const [name, setName] = useState("");
  // Fetch the name once the component is mounted
  async function resolveNameAndLookupAddress(address: string) {
    try {
      if (address !== undefined) {
        const resolvedName = await provider.lookupAddress(address);
        setName(resolvedName || truncatedAddress);
      } else {

      }
    } catch (error) {
      console.error("Error fetching name:", error);
    }
  }



  useEffect(() => {
    if (address) {
      fetchProfile(address);
      resolveNameAndLookupAddress(address)
    }
  }, [address]);

  const fetchProfile = (address: string) => {
    fetch(`https://cms.ebisusbay.com/api/profile?walletAddress=${address}`, {
      headers: {
        "eb-api-key": "x0WLHV5rpgnQ6Y8a3xM0",
      },
    })
      .then((response) => response.json())
      .then((data: { data: UserData }) => {
        // Update the type of 'data'
        console.log("API response data:", data); // Debugging log
        setProfiles(data.data); // Access the 'data' object
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  };
  const isCustomUsername = profiles?.username && !ethers.utils.isAddress(profiles.username);

  return (
    <HStack
      as="header"
      justify="space-between"
      align="center"
      p="1"
      color={"white"}
      bg={bgIm}
      bgSize={"cover"}
      textColor="white"
    >
      <Flex align="center">

        <IconButton
          aria-label="Menu"
          icon={<CgMenuGridR size="lg" color="white" />}
          transition="all 0.1s"
          size={{ base: "md", lg: "lg" }}
          onClick={onOpen}
          ref={btnRef}
          bg="transparent"
          _hover={{ bg: "transparent", scale: 1.1 }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={{ base: "xs", lg: "sm" }}
        >
          <DrawerOverlay />
          <DrawerContent bg={bgIm} textColor={"white"}>
            <DrawerHeader bgImg={isCustomUsername && address ? profiles?.banner : "/LibsDedicated.png"} bgSize={{ base: "cover", lg: "100% 100%" }} p={2}>
              <HStack justifyContent="space-between" p={1}>
                <HStack>
                  <Button variant="primary" size="sm" as={"a"} href={"/"}>
                    <Text>Return Home</Text>
                  </Button>
                  <Button
                    variant="primary" size="sm" onClick={onClose}
                  >
                    Go back
                  </Button>
                </HStack>
              </HStack>
              <Divider />

              <HStack p={4}>
                <Stack direction={isCustomUsername && address ? "column" : "row"}>
                  <Link href={"/Profile/MyProfile"} >
                    <Image onClick={onClose} src={isCustomUsername && address ? profiles?.profilePicture : "/Tokens/SteakhouseLogo.png"} h={"50px"} w={"50px"} borderRadius="3xl" />
                  </Link>
                  <Stack>
                    {isCustomUsername && address ? (
                      <Text>{profiles.username.toString()}</Text>
                    ) : (
                      null
                    )}
                    {address && profiles?.experience ? (
                      <Text fontSize={"sm"}>Ebisus exp = {profiles?.experience.toString()}</Text>
                    ) : null}
                  </Stack>
                  <Button
                    variant="primary" size="md"
                    as={ConnectWallet}
                    auth={{
                      loginOptional: false,
                    }}
                    dropdownPosition={{ side: "bottom", align: "start" }}
                    btnTitle="Connect To The Steakhouse"
                    modalTitle="Choose a wallet to begin"
                    detailsBtn={() => {
                      return <Button
                        p={2}
                        transition="all 0.3s"
                        _hover={{ transform: "scale(1.02)" }}
                        _active={{ transform: "scale(0.98)" }}
                        style={{ backgroundColor: theme.colors.meat1 }}
                        variant="primary" size="lg"
                      >
                        <VStack gap={-4}>
                          <HStack>
                            <Text
                              textAlign="center"
                              color="white"
                              fontSize={{ base: "sm", md: "sm" }}

                            >
                              {name ? name : truncatedAddress}
                            </Text>
                            <FaWallet />
                          </HStack>
                          <Text fontSize={{ base: "sm", md: "sm" }}
                            textAlign="center" color="white">
                            {truncatedValue}
                          </Text>
                        </VStack>
                      </Button>;
                    }}
                  />
                </Stack>
              </HStack>
            </DrawerHeader>
            <Divider />
            <DrawerBody>


              <Accordion allowToggle bg="transparent" gap={4}>
                {reDirects.map((item, index) => (
                  <AccordionItem my={4} bg="transparent" key={index}>
                    {({ isExpanded }) => (
                      <>
                        <Button
                          as={AccordionButton}
                          variant="primary"
                          key={index}
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                          _active={{
                            transform: "scale(1.02)",
                          }}
                          p={2}
                          justifyContent={"space-between"}
                        >
                          <Stack direction="row" w="100%" justifyContent={"space-between"}>
                            <Text>
                              {item.label}
                            </Text>
                            <AccordionIcon />
                          </Stack>
                        </Button>

                        <AccordionPanel bg="transparent">
                          {item.subpages && (
                            <SimpleGrid columns={2} gap={2} bg="transparent" mt={4}>
                              {item.subpages.map((subpage, subIndex) => (
                                <Button variant="primary" size="sm" as={"a"} href={subpage === "/" ? item.href : `${item.href}${subpage}`}
                                  key={subIndex}>
                                  <Text>{subpage === "/" ? `${item.label}` : subpage.replace(/^\//, "")}</Text>
                                </Button>
                              ))}
                            </SimpleGrid>
                          )}
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>



            </DrawerBody>
            <Divider />
            <DrawerFooter
              textColor={"white"}
              justifyContent="space-between"
              alignItems={"left"}
            >
              <HStack>
                <IconButton bg="transparent" as={"a"} href="https://twitter.com/DragonW2307"
                  _hover={{ bg: "transparent", scale: 1.1 }} icon={<FaTwitter size="lg" color="#7289da" />} aria-label={"Twitter"} />
                <IconButton bg="transparent" as={"a"}
                  _hover={{ bg: "transparent", scale: 1.1 }} href="https://discord.com/invite/ftBfuJAgxu" icon={<FaDiscord size="lg" color="#1DA1F2" />} aria-label={"Discord"} />

              </HStack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Heading fontSize="md" color="white">
          Dragon Warriors
        </Heading>
      </Flex>
      <Image
        src={"/Logo.png"}
        alt="Logo"
        h={"70px"}
        w={"70px"}
        onClick={onOpen}
        borderRadius={"md"}
      />
    </HStack>
  );
};

export default Header;
