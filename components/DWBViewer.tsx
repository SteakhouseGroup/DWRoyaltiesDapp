import { Button, Text, SimpleGrid, Heading, Flex, Divider, Collapse, VStack, Box } from "@chakra-ui/react";
import { useAddress, useContract, useOwnedNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useState } from "react";
import { objectOutputType, ZodNullable, ZodOptional, ZodUnion, ZodString, ZodNumber, ZodEffects, ZodArray, ZodObject, ZodBigInt, ZodType, ZodTypeDef, ZodUnknown, objectInputType } from "zod";
import { BigNumber } from "ethers";
import React from "react";
import { D_W__B_AD } from "../consts/Addresses";
import DWB_ABI from '../consts/ABIS/DWB.json';

export default function DWBViewer() {
  const address = useAddress();
  
  const { contract } = useContract(D_W__B_AD, DWB_ABI);

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
        {ownedNFTIds?.map((nft: { metadata: objectOutputType<{ name: ZodNullable<ZodOptional<ZodUnion<[ZodString, ZodNumber]>>>; description: ZodNullable<ZodOptional<ZodNullable<ZodString>>>; background_color: ZodNullable<ZodOptional<ZodUnion<[ZodString, ZodEffects<ZodString, string, string>, ZodString]>>>; properties: ZodNullable<ZodOptional<ZodUnion<[ZodArray<ZodObject<{}, "strip", ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, objectOutputType<{}, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">, objectInputType<{}, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">>, "many">, ZodObject<{}, "strip", ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, objectOutputType<{}, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">, objectInputType<{}, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">>]>>>; attributes: ZodNullable<ZodOptional<ZodUnion<[ZodArray<ZodObject<{}, "strip", ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, objectOutputType<{}, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">, objectInputType<{}, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">>, "many">, ZodObject<{}, "strip", ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, objectOutputType<{}, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">, objectInputType<{}, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">>]>>>; id: ZodString; uri: ZodString; image: ZodOptional<ZodNullable<ZodString>>; external_url: ZodOptional<ZodNullable<ZodString>>; animation_url: ZodOptional<ZodNullable<ZodString>>; }, ZodUnion<[ZodEffects<ZodUnion<[ZodBigInt, ZodType<BigNumber, ZodTypeDef, BigNumber>, ZodType<import("bn.js"), ZodTypeDef, import("bn.js")>]>, string, bigint | BigNumber | import("bn.js")>, ZodUnknown]>, "strip">; }) => (
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

                  {nft.metadata.attributes.map((attribute, index) => (
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
