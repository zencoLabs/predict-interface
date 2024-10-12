// import { ReactComponent as LogoIcon } from "@assets/logo.svg";
import AuthConnectButton from "@modules/AuthConnectButton";
import clsx from "clsx";
import { shortenAddress } from "@cfx-kit/dapp-utils/dist/address";

export const Header = () => {
  return (
    <>
      <div
        className={clsx(
          "sticky top-0 left-0 z-50 bg-gray-100 flex-vertical-center justify-between px-16px py-2px w-full web:(py-16px px-32px)"
        )}
      >
        <div className="flex-vertical-center">
          {/* <LogoIcon className="mr-6px web:(w-40px h-40px)" /> */}
          <a href="https://zenco.club/">
            <img src="https://zenco.club/zenco.png" className="mr-6px web:(w-40px h-40px)" style={{width:'40px',height:'40px'}}/>
          </a>
          <span className="text-(white-normal 16px) font-700 lh-24px web-(text-20px lh-28px)">
            <a href="https://zenco.club/" style={{
              color: '##f39c12',
              background: 'linear-gradient(90deg,#71b4e2,#ba92be,#bc7f1c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              fontSize: '24px'
            }}>Zenco </a>
          </span>
        </div>
        <AuthConnectButton className="px-12px py-9px rounded-8px flex-center text-14px font-500 lh-22px web-(px-16px py-12px text-16px lh-24px)">
          {(account) => (
            <div className="px-12px py-9px rounded-8px flex-center bg-gray-90 text-(white-normal 14px) font-500 lh-22px web-(px-16px py-12px text-16px lh-24px)">
              {shortenAddress(account)}
            </div>
          )}
        </AuthConnectButton>
      </div>
    </>
  );
};
