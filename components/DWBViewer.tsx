import { Button, Text, SimpleGrid, Heading, Flex, Divider, Image, Collapse, VStack, Box } from "@chakra-ui/react";
import { useAddress, useContract, useOwnedNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useState } from "react";
import { BigNumber } from "ethers";
import React from "react";
import { D_W_B_AD } from "../consts/Addresses";
import DWB_ABI from '../consts/ABIS/DWB.json';

export default function DWBViewer() {
  const address = useAddress();

  const { contract } = useContract(D_W_B_AD, DWB_ABI);

  const { data: ownedNFTIds, isLoading: isLoadingOwnedNFTs, error: ownedNFTsError } = useOwnedNFTs(contract, address)


  // Function to toggle the visibility of attributes


  const nftIds = ownedNFTIds?.map((nft: { metadata: { id: string } }) => nft.metadata.id) || [];

  return (
    <Box bg="dw2" h="100%">
      <SimpleGrid columns={{ base: 2, lg: 5 }} justifyContent="center" m="auto" bg="dw2" spacing={2} p={4} textAlign={"center"}>
        {ownedNFTIds?.map((nft) => (
          <VStack bg="meat4" key={nft.metadata.id.toString()} p={4} borderRadius="md"
          >
            <Image
              src={`https://ipfs.io/ipfs/QmXDGewSsbJbugRCv5HSeBnc8WYTVuEmgbP1FqPRKv6xhf/${nft.metadata.id}.png`}
            />
            <Heading size={"md"} textColor={"white"}
            >
              {nft.metadata.id}
            </Heading>

            <Divider
            />
          </VStack>
        ))}

      </SimpleGrid>
    </Box>
  );
};
