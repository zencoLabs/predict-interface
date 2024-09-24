import { registerWallet } from "@cfx-kit/react-utils/dist/AccountManage";
import {
  EthereumProvider as MetaMaskProvider,
  FluentEthereumProvider,
  // createWalletConnectProvider,
} from "@cfx-kit/react-utils/dist/AccountManagePlugins";
import MetaMaskIcon from "@assets/wallets/metamask.svg";
import FluentEthereumIcon from "@assets/wallets/fluent.svg";
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
  FluentEthereumProvider,
  MetaMaskProvider,
] as const;

export const iconConfig = {
  Ethereum: MetaMaskIcon,
  "Fluent-Ethereum": FluentEthereumIcon,
  // WalletConnect: WalletConnectIcon,
} as const;

export const walletsConfig = allProviders.map((provider) => ({
  name: provider.walletName,
  iconPath: iconConfig[provider.walletName as "Ethereum"],
}));

(function () {
  allProviders.forEach((provider) => {
    registerWallet(provider);
  });
})();
