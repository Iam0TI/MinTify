import "@/styles/globals.css";
import "@coinbase/onchainkit/styles.css";
import NavBar from "./Components/navbar";
import Footer from "./Components/footer";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Playfair_Display } from "next/font/google";
import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { MintifyProvider } from "./Context/mintifyContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'Mintify',
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
        >
          <MintifyProvider>
          <div className={playfair.className}>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </div>
          </MintifyProvider>

        </OnchainKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}