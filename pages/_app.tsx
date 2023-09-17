import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  trustWallet,
  WalletConfig,
  metamaskWallet,
  paperWallet,
  walletConnect,
  coinbaseWallet,

} from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Base, Cronos, Ethereum, Polygon } from "@thirdweb-dev/chains";
import { InjectedWallet } from "@thirdweb-dev/wallets";
import Head from "next/head";
import Header from "../components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "../utils/Theme";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const injectedWalletConfig: WalletConfig<InjectedWallet> = {
  id: "injected-wallet",
  meta: {
    name: "DeFi Wallet",
    iconURL: "/Defi.png",
  },
  create: () => new InjectedWallet(),
  isInstalled: () => true, // Custom logic to check if the wallet is installed
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.TW_CLIENT_ID}
      supportedWallets={[
        injectedWalletConfig,
        metamaskWallet(),
        trustWallet(),
        walletConnect(),
        coinbaseWallet(),
      ]}
      activeChain={{
        chainId: 25,
        rpc: [
          "https://rpc.vvs.finance/",
          "https://rpc.crodex.app/",
        ],
        nativeCurrency: {
          decimals: 18,
          name: "Cronos",
          symbol: "CRO",
        },
        shortName: "CRO",
        slug: "Cronos",
        testnet: false,
        chain: "Cronos Mainnet",
        name: "Cronos Mainnet", // Name of the network
      }}
      dAppMeta={{
        name: "Dragon Warriors",
        description: "Welcome to The Dragon Warriors Claim Dapp, home of the Chefz, STEAK and more!",
        logoUrl: "/Logo.png",
        url: "https://www.dragonwarriors.netlify.app",
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
