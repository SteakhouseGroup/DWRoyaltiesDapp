import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { VStack } from "@chakra-ui/react";
import DWBViewer from "../components/DWBViewer";
import DWBRoyalties from "../components/DWBRoyalty";

const DragonWarriorsBoost: NextPage = () => {
  return (
    <VStack bg="dw2" h="100vh">
      <DWBRoyalties />
      <DWBViewer />
    </VStack>
  );
};

export default DragonWarriorsBoost;
