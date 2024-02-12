import { useEffect, useState } from "react";
import { Button, Heading, Box, VStack, Stack, Text } from "@chakra-ui/react";
import {
  useContract,
  useAddress,
  useContractRead,
  useOwnedNFTs,
  Web3Button,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { DW_Royalties, D_W_AD } from "../consts/Addresses";

import royaltiesAbi from "../consts/ABIS/Royalties.json";

import DW_ABI from "../consts/ABIS/DW.json";

export default function DWRoyalties() {
  const { contract: royaltyContract } = useContract(DW_Royalties, royaltiesAbi);
  const address = useAddress();

  const { contract: DW_Contract } = useContract(D_W_AD, DW_ABI);

  const { data: ownedNFTs } = useOwnedNFTs(DW_Contract, address);
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

  const { data: totalOwed, isLoading: isLoadingTotalOwed } = useContractRead(
    royaltyContract,
    "mymultiPAYOUT",
    [ownedNFTsArray],
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
            contractAddress={DW_Royalties}
            action={(contract: {
              call: (
                arg0: string,
                arg1: (string | number[] | undefined)[],
              ) => void;
            }) => {
              contract.call("multiRelease", [
                [Number(ownedNFTsArray)],
                address,
              ]);
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
