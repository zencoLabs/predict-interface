import { registerWallet } from "@cfx-kit/react-utils/dist/AccountManage";
import {
  EthereumProvider as MetaMaskProvider,
  FluentEthereumProvider,
  // createWalletConnectProvider,
} from "@cfx-kit/react-utils/dist/AccountManagePlugins";
import MetaMaskIcon from "@assets/wallets/metamask.svg";
import FluentEthereumIcon from "@assets/wallets/fluent.svg";
import { isMobile } from "./is";
// import WalletConnectIcon from "@assets/wallets/wallet-connect.svg";

// If you want to use wallet-connect, please apply for the relevant configuration yourself
// const WalletConnectProvider = createWalletConnectProvider({
//   projectId: "$projectId",
//   targetChainId: "$targetChainId",
//   metadata: {
//     name: "$name",
//     description:
//       "$description",
//     url: window.location.host,
//     icons: ["$icons"],
//   },
// });

const allProviders = [
  // WalletConnectProvider,
  !isMobile && FluentEthereumProvider,
  MetaMaskProvider,
] as const;

export const iconConfig = {
  Ethereum: MetaMaskIcon,
  "Fluent-Ethereum": FluentEthereumIcon,
  // WalletConnect: WalletConnectIcon,
} as const;

(function () {
  allProviders.forEach((provider) => {
    provider && registerWallet(provider);
  });
})();
