import { NextPage } from "next";
import { Heading, VStack, Text, Image, SimpleGrid, Divider, Stack, Button, Link } from "@chakra-ui/react";
import {MdOutlineOpenInNew} from "react-icons/md"

const Home: NextPage = () => {
  return (
    <VStack bg="dw2" h="100vh" textAlign={"center"} m="auto" justifyContent={"center"} p={4} textColor="white">
      <Heading>Welcome to Dragon Warriors!</Heading>
      <Text>Claim royalties today for either of our collections</Text>
      <Divider />
      <Stack direction={{base:"column", lg: "row"}} textAlign={"center"} spacing={4} textColor={"white"}>

        <VStack bg={"dw4"} p={4} borderRadius={"md"}>
          <Text>
            Click here to claim CRO for<br/>  holding Dragon Warriors!
          </Text>
          <Button as={Link} textColor="white"  bg="dw2" size="lg" href="/DragonWarriors" rightIcon={<MdOutlineOpenInNew />} >
              Go there now
            </Button>
        </VStack>

        <VStack bg={"dw4"} p={4} borderRadius={"md"}>
          <Text>
            Click here to claim CRO for<br/> holding Dragon Boosters!
          </Text>
          <Button as={Link} href="/DragonWarriorsBoost" bg="dw2" size="lg" textColor="white" rightIcon={<MdOutlineOpenInNew />} >
              Go there now
            </Button>
        </VStack>
      </Stack>
      <SimpleGrid columns={{base:2, lg:4}} m="auto" spacing="2" mt="0">

      <Image src="/images/DragonWarrior1.jpeg" height="150px"  width="150px" borderRadius="md"/>
      <Image src="/images/DragonWarrior2.jpeg" height="150px"  width="150px" borderRadius="md"/>


      <Image src="/images/DragonWarrior3.jpeg" height="150px"  width="150px" borderRadius="md"/>
      <Image src="/images/DragonWarrior4.jpeg" height="150px"  width="150px" borderRadius="md"/>
      </SimpleGrid>
      <Divider />

      </VStack>
  );
};

export default Home;
