import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  trustWallet,
  WalletConfig,
  metamaskWallet,
  paperWallet,
  walletConnect,
  coinbaseWallet,
  cryptoDefiWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import {
  Base,
  Cronos,
  CronosTestnet,
  Ethereum,
  Polygon,
} from "@thirdweb-dev/chains";
import { InjectedWallet } from "@thirdweb-dev/wallets";
import Head from "next/head";
import Header from "../components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "../utils/Theme";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={"3cbbd7617a8d926352e558b3fd4849ba"}
      secretKey=""
      supportedWallets={[
        cryptoDefiWallet(),
        metamaskWallet(),
        trustWallet(),
        walletConnect(),
        coinbaseWallet(),
      ]}
      activeChain={Cronos}
      dAppMeta={{
        name: "Dragon Warriors",
        description:
          "Welcome to The Dragon Warriors Claim Dapp, home of the Chefz, STEAK and more!",
        logoUrl: "/Logo.png",
        url: "https://www.dragonwarriorscro.netlify.app",
        isDarkMode: true,
      }}
      autoConnect={true}
    >
      <Head>
        <title>Dragon Warriors</title>
      </Head>
      <ChakraProvider theme={Theme}>
        <Header heading={"Dragon Warriors"} bgIm={"#1592ca"} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
