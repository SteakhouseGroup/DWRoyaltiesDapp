import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { VStack } from "@chakra-ui/react";
import DWViewer from "../components/DWViewer";
import DWRoyalties from "../components/DWRoyalty";

const DragonWarriors: NextPage = () => {
  return (
    <VStack bg="dw2" h="100vh">
      <DWRoyalties />
      <DWViewer />
    </VStack>
  );
};

export default DragonWarriors;
