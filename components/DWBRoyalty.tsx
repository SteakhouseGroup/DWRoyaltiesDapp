import { useEffect, useState } from "react";
import { Button, Heading, Box, VStack, Stack, Text } from "@chakra-ui/react";
import {
  useContract,
  useAddress,
  useContractRead,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { DWB_Royalties, D_W_B_AD } from "../consts/Addresses";

import royaltiesAbi from "../consts/ABIS/Royalties.json";

import DWB_ABI from "../consts/ABIS/DWB.json";

export default function DWBRoyalties() {
  const { contract: royaltyContract } = useContract(
    DWB_Royalties,
    royaltiesAbi,
  );
  const address = useAddress();

  const { contract: DWB_Contract } = useContract(D_W_B_AD, DWB_ABI);

  const { data: ownedNFTs } = useOwnedNFTs(DWB_Contract, address);
  const ownedNFTsArray = ownedNFTs?.map((nft) => Number(nft.metadata.id));

  const {
    data: royaltyContractDistributed,
    isLoading: isLoadingroyaltyContractDistributed,
    error: royaltyroyaltyContractDistributed,
  } = useContractRead(royaltyContract, "totalReleased");

  const {
    data: royaltyContractBalance,
    isLoading: isLoadingroyaltyContractBalance,
    error: royaltyContractBalanceError,
  } = useContractRead(royaltyContract, "getContractBalance");

  const [nftIds, setNftIds] = useState<string[]>([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "eb-api-key": "x0WLHV5rpgnQ6Y8a3xM0",
    },
  };
  const apiUrl = `https://api.ebisusbay.com/v2/wallets?wallet=${address}&collection=0x73cc8C969090441B0b3B880f2642A07eFB08D562&direction=asc&pageSize=100`;

  useEffect(() => {
    if (address) {
      fetchAllPages(apiUrl, options);
    }
  }, [address]);

  async function fetchAllPages(
    url: string,
    options: any,
    currentPage: number = 1,
    nftIds: string[] = [],
  ): Promise<string[]> {
    const response = await fetch(`${url}&page=${currentPage}`, options);
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
    setNftIds(nftIds);
    return nftIds;
  }

  const { data: totalOwed, isLoading: isLoadingTotalOwed } = useContractRead(
    royaltyContract,
    "mymultiPAYOUT",
    [nftIds],
  );
  const formattedTotalOwed = totalOwed
    ? parseFloat((totalOwed / 10 ** 18).toFixed(18)).toFixed(4)
    : "N/A";

  const formattedTotalBalance = royaltyContractBalance
    ? parseFloat((royaltyContractBalance / 10 ** 18).toFixed(18)).toFixed(4)
    : "N/A";
  const formattedTotalDistributed = royaltyContractDistributed
    ? parseFloat((royaltyContractDistributed / 10 ** 18).toFixed(18)).toFixed(4)
    : "N/A";

  const nftIdsAsNumbers = nftIds.map((id) => parseInt(id, 10)); // Use parseInt with base 10

  return (
    <Box p={4}>
      <Stack direction={{ base: "column", lg: "row" }} maxW={1024} m="auto">
        <VStack
          textAlign="center"
          bg="dw4"
          h="180px"
          w="280px"
          alignContent={"center"}
          justifyContent="center"
          m="auto"
          borderRadius="md"
        >
          <Heading size="md" textColor="white">
            CRO Available to claim{" "}
          </Heading>
          <Heading size="md" textColor="white">
            {formattedTotalOwed} CRO{" "}
          </Heading>
          <Button
            as={Web3Button}
            contractAddress={DWB_Royalties}
            action={(contract: {
              call: (
                arg0: string,
                arg1: (string | number[] | undefined)[],
              ) => void;
            }) => {
              contract.call("multiRelease", [nftIdsAsNumbers, address]);
            }}
            variant="primary"
          >
            Claim
          </Button>
        </VStack>
        <VStack
          textAlign="center"
          bg="dw4"
          h="180px"
          w="280px"
          alignContent={"center"}
          justifyContent="center"
          m="auto"
          borderRadius="md"
        >
          <Heading size="md" w="280" textColor="white">
            Royalty Contract Balance{" "}
          </Heading>
          <Text size="md" w="280" textColor="white">
            {formattedTotalBalance} CRO{" "}
          </Text>
        </VStack>
        <VStack
          textAlign="center"
          bg="dw4"
          h="180px"
          w="280px"
          alignContent={"center"}
          justifyContent="center"
          m="auto"
          spacing={2}
          borderRadius="md"
        >
          <Heading size="md" textColor="white">
            Royalty Contract Distributions to date{" "}
          </Heading>
          <Text size="md" textColor="white">
            {formattedTotalDistributed} CRO{" "}
          </Text>
        </VStack>
      </Stack>
    </Box>
  );
}
