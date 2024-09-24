import { useAccount, useChainId } from '@cfx-kit/react-utils/dist/AccountManage';
import { Network } from './index';

export enum AuthConnectStatus {
  Connected = 'connected',
  NotConnected = 'not-connected',
  NotChainMatch = 'not-chainMatch',
}

export const useAuthConnect = () => {
  const account = useAccount();
  const chainId = useChainId();
  const isChainMatch = chainId === Network.chainId;

  const authConnectStatus = account ? (isChainMatch ? AuthConnectStatus.Connected : AuthConnectStatus.NotChainMatch) : AuthConnectStatus.NotConnected;

  return { authConnectStatus, account, chainId } as const;
};
