import React, { type ComponentProps } from "react";
import cx from "clsx";
import {
  connect,
  useCurrentWalletName,
  getRegisteredWallets,
  useRegisteredWallets,
} from "@cfx-kit/react-utils/dist/AccountManage";
import { iconConfig } from "@utils/wallet";
import { Drawer } from "@components/Drawer&Modal";

type Props = Omit<ComponentProps<typeof Drawer>, "title"> & {
  type?: "connect" | "change";
};

const WalletOption: React.FC<{
  wallet: ReturnType<typeof getRegisteredWallets>[0];
  onClose?: VoidFunction;
}> = ({ wallet, onClose }) => {
  const { provider, status } = wallet;
  const currentWalletName = useCurrentWalletName();
  return (
    <div
      className={cx(
        "flex-vertical-center justify-between p-12px rounded-8px bg-#373535 cursor-pointer font-500 gap-10px",
        provider.walletName === currentWalletName && "pointer-events-none"
      )}
      key={provider.walletName}
      onClick={async () => {
        try {
          await connect(provider.walletName);
          onClose?.();
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <img
        className="w-24px h-24px"
        src={iconConfig[provider.walletName as "Ethereum"]}
      />
      <div className="flex items-center flex-1 text-(white-normal 14px) lh-22px">
        {provider.walletName === "Ethereum"
          ? "MetaMask"
          : provider.walletName === "Fluent-Ethereum"
          ? "Fluent"
          : provider.walletName}
      </div>
      {status === "not-installed" && (
        <div className="text-(yellow-100 12px) font-500 lh-20px px-6px py-2px rounded-4px bg-gray-90">
          Not detected
        </div>
      )}
    </div>
  );
};

const WalletSelectModal: React.FC<Props> = ({
  type = "connect",
  onClose,
  ...props
}) => {
  const wallets = useRegisteredWallets();
  const title = type === "connect" ? "Connect Wallet" : "Change Wallet";
  return (
    <>
      <Drawer title={title} trigger={props.trigger}>
        {({ close }) => (
          <div className="flex flex-col gap-16px">
            {wallets.map((wallet, i) => (
              <WalletOption
                wallet={wallet}
                onClose={() => {
                  close();
                  onClose?.();
                }}
                key={i}
              />
            ))}
          </div>
        )}
      </Drawer>
    </>
  );
};

export default WalletSelectModal;
