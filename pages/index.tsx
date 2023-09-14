import { NextPage } from "next";
import { Heading, VStack, Text, Image, SimpleGrid, Divider } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <VStack bg="dw2" h="100vh" textAlign={"center"} m="auto" justifyContent={"center"} p={4} textColor="white">
      <Heading>Welcome to Dragon Warriors!</Heading>
      <Text>Claim royalties today for either of our collections</Text>
      <Divider />
      <SimpleGrid columns={{base:2, lg:5}} m="auto" spacing="2">
      <Image src="/DragonWarrior1.jpeg" height="70px"  width="70px" borderRadius="md"/>
      <Image src="/DragonWarrior2.jpeg" height="70px"  width="70px" borderRadius="md"/>
      <Divider />

      <Image src="/DragonWarrier3.jpeg" height="70px"  width="70px" borderRadius="md"/>
      <Image src="/DragonWarrior4.jpeg" height="70px"  width="70px" borderRadius="md"/>
      <Divider />
      </SimpleGrid>
      </VStack>
  );
};

export default Home;
