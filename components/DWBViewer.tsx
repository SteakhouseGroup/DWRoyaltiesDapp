import { Button, Text, SimpleGrid, Heading, Flex, Divider, Image, Collapse, VStack, Box } from "@chakra-ui/react";
import { useAddress, useContract, useOwnedNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import React from "react";
import { D_W_B_AD } from "../consts/Addresses";
import DWB_ABI from '../consts/ABIS/DWB.json';

export default function DWBViewer() {
  const address = useAddress();
  const { contract } = useContract(D_W_B_AD, DWB_ABI);

  const [nftIds, setNftIds] = useState<string[]>([]);

  const options = { method: 'GET', headers: { accept: 'application/json', "eb-api-key": "x0WLHV5rpgnQ6Y8a3xM0", } };
  const apiUrl = `https://api.ebisusbay.com/v2/wallets?wallet=${address}&collection=0x73cc8C969090441B0b3B880f2642A07eFB08D562&direction=asc&pageSize=100`;

  useEffect(() => {
    if (address) {
      fetchAllPages(apiUrl, options)
    }
  }, [address]);

  async function fetchAllPages(
    url: string,
    options: any,
    currentPage: number = 1,
    nftIds: string[] = []
  ) {
    const response = await fetch(`${url}&page=${currentPage}`, options, );
    const data = await response.json();
    if (response.status !== 200) {
      console.error(`Error fetching page ${currentPage}: ${data.error}`);
      return nftIds;
    }
    const nftIdsOnPage = data.nfts.map((nft: any) => nft.nftId);
    nftIds.push(...nftIdsOnPage);
    if (currentPage < data.totalPages) {
      return fetchAllPages(url, options, currentPage + 1, nftIds);
    }
    setNftIds(nftIds)
    return nftIds;
  }





  return (
    <Box bg="dw2" h="100%">
      <SimpleGrid columns={{ base: 2, lg: 5 }} justifyContent="center" m="auto" bg="dw2" spacing={2} p={4} textAlign={"center"}>
        {nftIds?.map((nft) => (
          <VStack bg="meat4" key={nft} p={4} borderRadius="md"
          >
            <Image
              src={`https://ipfs.io/ipfs/QmXDGewSsbJbugRCv5HSeBnc8WYTVuEmgbP1FqPRKv6xhf/${nft}.png`}
            />
            <Heading size={"md"} textColor={"white"}
            >
              {nft}
            </Heading>

            <Divider
            />
          </VStack>
        ))}

      </SimpleGrid>
    </Box>
  );
};
