import { type ComponentProps, type ReactNode } from "react";
import { switchChain } from "@cfx-kit/react-utils/dist/AccountManage";
import Button from "@components/Button";
import { isProduction } from "@utils/is";
import WalletSelectModal from "./WalletSelectModal";
import { useAuthConnect, AuthConnectStatus } from "./useAuthConnect";
export { AuthConnectStatus } from "./useAuthConnect";

export const Network = {
  chainId: isProduction ? "1030" : "71",
  chainName: isProduction ? "Conflux eSpace" : "Conflux eSpace (Testnet)",
  rpcUrls: [import.meta.env.VITE_ESpaceRpcUrl],
  blockExplorerUrls: [import.meta.env.VITE_ESpaceScanUrl],
  nativeCurrency: {
    name: "Conflux",
    symbol: "CFX",
    decimals: 18,
  },
};

const handleClickSwitchChain = () => {
  switchChain(Network.chainId, {
    addChainParams: {
      ...Network,
      chainId: "0x" + Number(Network.chainId).toString(16),
    },
  });
};

type Color = ComponentProps<typeof Button>["color"];
type Props = Omit<
  ComponentProps<typeof Button>,
  "children" | "className" | "color"
> & {
  avaibleWithMismatchChain?: boolean;
  children: ReactNode | ((account: string) => JSX.Element);
  className?:
    | string
    | ((
        authConnectStatus: Omit<AuthConnectStatus, AuthConnectStatus.Connected>
      ) => string);
  color?:
    | Color
    | ((
        authConnectStatus: Omit<AuthConnectStatus, AuthConnectStatus.Connected>
      ) => Color);
  suffix?: ReactNode;
};
/**
 * Detects if the wallet is connected and is on the correct network.
 * If the detection passes, the children element is displayed.
 * Otherwise, the button with the connection and switch network functions is displayed.
 */
const AuthConnectButton: React.FC<Props> = ({
  children,
  className,
  color,
  suffix,
  avaibleWithMismatchChain = false,
  ...props
}) => {
  const { account, authConnectStatus } = useAuthConnect();
  console.log("authConnectStatus", authConnectStatus);

  if (
    authConnectStatus === AuthConnectStatus.Connected ||
    (avaibleWithMismatchChain &&
      authConnectStatus === AuthConnectStatus.NotChainMatch)
  ) {
    return typeof children === "function" ? children(account!) : children;
  }

  if (authConnectStatus === AuthConnectStatus.NotConnected) {
    return (
      <WalletSelectModal
        trigger={({ triggerProps }) => (
          <Button
            className={
              typeof className === "function"
                ? className(authConnectStatus)
                : className
            }
            color={
              typeof color === "function" ? color(authConnectStatus) : color
            }
            id="auth-connect"
            {...props}
            {...triggerProps}
            type="button"
          >
            Connect Wallet&nbsp;{suffix}
          </Button>
        )}
      />
    );
  }

  if (authConnectStatus === AuthConnectStatus.NotChainMatch) {
    return (
      <Button
        className={
          typeof className === "function"
            ? className(authConnectStatus)
            : className
        }
        color={typeof color === "function" ? color(authConnectStatus) : color}
        id="auth-connect-switchChain"
        {...props}
        onClick={handleClickSwitchChain}
        type="button"
      >
        Switch Network&nbsp;{suffix}
      </Button>
    );
  }
};

export default AuthConnectButton;
