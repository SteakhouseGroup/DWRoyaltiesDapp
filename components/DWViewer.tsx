import { Button, Text, SimpleGrid, Heading, Flex, Divider, Collapse, VStack, Box } from "@chakra-ui/react";
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


  // Function to toggle the visibility of attributes
  const toggleAttributesVisibility = () => {
    setIsAttributesVisible(!isAttributesVisible);
  };

  const nftIds = ownedNFTIds?.map((nft: { metadata: { id: string } }) => nft.metadata.id) || [];

  return (
    <Box>
      <SimpleGrid columns={{ base: 2, lg: 5 }} justifyContent="center" m="auto" spacing={2} p={4}>
        {ownedNFTIds?.map((nft) => (
          <VStack bg="meat4" key={nft.metadata.id.toString()} p={4} borderRadius="md"
          >


            <ThirdwebNftMedia
              metadata={nft.metadata}
            />


            <Heading size={"md"} textColor={"white"}
            >
              {nft.metadata.name}
            </Heading>

            <Divider
            />
            <SimpleGrid h={4} />
            <Button variant="primary" onClick={toggleAttributesVisibility} size={"sm"}>
              {isAttributesVisible ? "Hide Attributes" : "Show Attributes"}
            </Button>

            <Collapse in={isAttributesVisible}>
              {Array.isArray(nft.metadata.attributes) && (
                <div>
                  <SimpleGrid h={4} />

                  {nft.metadata.attributes.map((attribute: { [s: string]: unknown; } | ArrayLike<unknown>, index: React.Key | null | undefined) => (
                    <div key={index}>
                      {Object.entries(attribute).map(([key, value]) => (
                        <div key={key}>
                          {key === "trait_type" ? (
                            <Heading
                              size={"sm"}
                              textColor={"white"}
                              fontSize={"lg"}
                              textAlign="center"
                              css={{ fontFamily: "'FriskyPuppy', sans-serif" }}
                            >
                              {value as string}
                              <Divider />

                            </Heading>
                          ) : (
                            <Text textAlign={"center"} textColor={"white"}
                            >{value as string}</Text>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </Collapse>


          </VStack>
        ))}


      </SimpleGrid>
    </Box>
  );
};
