import { ConnectWallet, NATIVE_TOKEN_ADDRESS, useAddress, useSDK, useTransferToken } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { Box, Button, Input, VStack, useToast , Text, Heading} from "@chakra-ui/react";
import DWViewer from "../components/DWViewer";
import DWRoyalties from "../components/DWRoyalty";
import { useState } from "react";
import { DW_Royalties } from "../consts/Addresses";

const DragonWarriors: NextPage = () => {
  const [rewardsAmount, setrewardsAmount] = useState<Number>(10); // Specify the type of setAmount as a number

  const address = useAddress();
  const owner = "0x1a28fb82134fc68f19760758e4f1f971df9fe163"
  const DEV = "0xb68b5B646ECa05fe554a5e3cb499e664a91050D5"
  const isOwner = address === owner || address === DEV
  const toast = useToast()
  const [transferring, setTransferring] = useState(false);
  const handleSuccess = () => {
    toast({
      title: "Transaction Successful",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleError = () => {
    toast({
      title: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };



const sdk = useSDK()

  const transferFunction = async () => {
    setTransferring(true);
    try {
      const txResult = await sdk?.wallet.transfer(DW_Royalties, rewardsAmount?.toString());
      console.log(txResult)
      handleSuccess();
    } catch (err) {
      handleError();
    }
    setTransferring(false);
  };

  return (
    <VStack bg="dw2" h={{base:"100%", lg:"100vh"}}>
      <DWRoyalties />
      <DWViewer />
      <Box bg="dw2" p={2} w="100%">

      {isOwner && (
        <Box m="auto" justifyContent={"center"} alignContent={"center"} p={4}>
          <VStack textAlign={"center"}>
            <Heading>Admin only section</Heading>
                <Text>Rewards input</Text>
                <Text fontSize={"xs"}>You are transferring to<br/> {DW_Royalties}</Text>

<Input
  type="number"
  w="100%"
  value={rewardsAmount.toString()}
  onChange={(event) => {
    const newValue = event.target.value;
    setrewardsAmount(Number(newValue));
  }}  textColor={"black"}
  maxW={300}
  m="auto"
/>
        <Button
          m="auto"
          alignContent="center"
          justifyContent="center"
          onClick={transferFunction}
          isLoading={transferring}
        >
          transfer rewards to contract
        </Button>
        </VStack>
        </Box>
      )}
            </Box>

    </VStack>
  );
};

export default DragonWarriors;


