import { ReactComponent as LogoIcon } from "@assets/logo.svg";
import AuthConnectButton from "@modules/AuthConnectButton";
import clsx from "clsx";
import { shortenAddress } from "@cfx-kit/dapp-utils/dist/address";

export const Header = () => {
  return (
    <>
      <div
        className={clsx(
          "sticky z-100 flex-vertical-center justify-between px-16px py-2px w-full web:(py-16px px-32px)"
        )}
      >
        <div className="flex-vertical-center">
          <LogoIcon className="mr-6px web:(w-40px h-40px)" />
          <span className="text-(#FFF 16px) font-700 lh-24px web-(text-20px lh-28px)">
            Zenco
          </span>
        </div>
        <AuthConnectButton className="px-12px py-9px rounded-8px flex-center text-14px font-500 lh-22px web-(px-16px py-12px text-16px lh-24px)">
          {(account) => (
            <div className="px-12px py-9px rounded-8px flex-center bg-#262525 text-(#FFF 14px) font-500 lh-22px web-(px-16px py-12px text-16px lh-24px)">
              {shortenAddress(account)}
            </div>
          )}
        </AuthConnectButton>
      </div>
    </>
  );
};
