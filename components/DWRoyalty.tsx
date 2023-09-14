import { useEffect, useState } from 'react';
import { Button, Heading, Box, VStack, Stack, Text } from "@chakra-ui/react";
import { useContract, useAddress, useContractRead, useOwnedNFTs, Web3Button } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { DW_Royalties, D_W_AD } from '../consts/Addresses';

import royaltiesAbi from '../consts/ABIS/Royalties.json';

import DW_ABI from '../consts/ABIS/DW.json';



export default function DWRoyalties() {






    const [floorPrice, setFloorPrice] = useState<string | null>(null);
    const [salesVolume, setSalesVolume] = useState<string | null>(null);
    const [royaltyPrice, setRoyaltyPrice] = useState<string | null>(null);



    const { contract: royaltyContract } = useContract(DW_Royalties, royaltiesAbi);
    const address = useAddress();

    const { contract: DW_Contract } = useContract(D_W_AD, DW_ABI);

    const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const { data: ownedNFTs } = useOwnedNFTs(DW_Contract, address);
    const { data: royaltyContractDistributed, isLoading: isLoadingroyaltyContractDistributed, error: royaltyroyaltyContractDistributed } = useContractRead(royaltyContract, "totalReleased");

    const { data: royaltyContractDistributedUser, isLoading: isLoadingroyaltyContractDistributedUser, error: royaltyroyaltyContractDistributedUser } = useContractRead(royaltyContract, "released", [address]);
    const { data: royaltyContractBalance, isLoading: isLoadingroyaltyContractBalance, error: royaltyContractBalanceError } = useContractRead(royaltyContract, "getContractBalance");
    const { data: totalOwed, isLoading: isLoadingTotalOwed } = useContractRead(royaltyContract, "mymultiPayout", [formatSelectedNFTs2()])
    const formattedTotalOwed = totalOwed ? parseFloat((totalOwed / 10 ** 18).toFixed(18)).toFixed(4) : 'N/A';

    const formattedTotalBalance = royaltyContractBalance ? parseFloat((royaltyContractBalance / 10 ** 18).toFixed(18)).toFixed(4) : 'N/A';
    const formattedTotalDistributed = royaltyContractDistributed ? parseFloat((royaltyContractDistributed / 10 ** 18).toFixed(18)).toFixed(4) : 'N/A';

    function handleSelectAll() {
        const allNFTs = ownedNFTs?.map((nft) => nft.metadata.id) ?? [];
        setSelectedNFTs(allNFTs);
        setSelectAll(true);
    }

    function formatSelectedNFTs2() {
        return selectedNFTs.map((nft) => parseInt(nft, 10));
    }

    useEffect(() => {
        if (ownedNFTs) {
            const allNFTs = ownedNFTs.map((nft) => nft.metadata.id);
            setSelectedNFTs(allNFTs);
            setSelectAll(true);
        }
    }, [ownedNFTs]);

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
                    <Heading
                        size="md" textColor="white" >
                        CRO Available to claim            </Heading>
                    <Heading
                        size="md" textColor="white" >
                        {formattedTotalOwed} CRO            </Heading>
                    <Button
                        as={Web3Button}
                        contractAddress={DW_Royalties}
                        action={(contract: { call: (arg0: string, arg1: (string | number[] | undefined)[]) => void; }) => {
                            contract.call("multiRelease", [formatSelectedNFTs2(), address])
                        }}
                        variant="primary">
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
                    <Heading size="md"
                        w="280" textColor="white" >
                        Royalty Contract Balance         </Heading>
                    <Text size="md"
                        w="280" textColor="white">

                        {formattedTotalBalance} CRO         </Text>

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
                    <Heading size="md" textColor="white" >
                        Royalty Contract Distributions to date         </Heading>
                    <Text size="md" textColor="white" >
                        {formattedTotalDistributed} CRO         </Text>

                </VStack>
            </Stack>
        </Box>
    );
}



