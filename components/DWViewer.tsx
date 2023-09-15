import { Button, Text, SimpleGrid, Heading, Flex, Divider, Collapse, Image, VStack, Box } from "@chakra-ui/react";
import { useAddress, useContract, useOwnedNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useState } from "react";
import { BigNumber } from "ethers";
import React from "react";
import { D_W_AD } from "../consts/Addresses";
import DW_ABI from '../consts/ABIS/DW.json';

export default function DWViewer() {
  const address = useAddress();
  
  const { contract } = useContract(D_W_AD, DW_ABI);

  const { data: ownedNFTIds, isLoading: isLoadingOwnedNFTs, error: ownedNFTsError } = useOwnedNFTs(contract, address)
  const [isAttributesVisible, setIsAttributesVisible] = useState(false);

  if (!ownedNFTIds) {
    return null; // or render a loading state or an error message
  }



  const nftIds = ownedNFTIds?.map((nft: { metadata: { id: string } }) => nft.metadata.id) || [];

  return (
    <Box bg="dw2" h="100%">
      <SimpleGrid columns={{ base: 2, lg: 5 }} justifyContent="center" m="auto" spacing={2} p={4} textAlign={"center"}>
        {ownedNFTIds?.map((nft) => (
          <VStack bg="meat4" key={nft.metadata.id.toString()} p={4} borderRadius="md"
          >


<ThirdwebNftMedia metadata={nft.metadata} />


            <Heading size={"md"} textColor={"white"}
            >
              {nft.metadata.name}
            </Heading>
<Text>{nft.metadata.id}</Text>
            <Divider
            />
          </VStack>
        ))}

      </SimpleGrid>
    </Box>
  );
};
