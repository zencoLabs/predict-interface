import { fetchChain } from '@utils/fetch';
import waitAsyncResult from '@cfx-kit/utils/dist/waitAsyncResult';

export const isTransactionReceipt = async (txHash: string) => {
  const txReceipt: { blockNumber: string; blockHash: string; transactionHash: string; from: string; to: string; status: '0x0' | '0x1' } = await fetchChain({
    method: 'eth_getTransactionReceipt',
    params: [txHash],
  });

  if (txReceipt && txReceipt.blockNumber) {
    return txReceipt;
  }
  return undefined;
};

export const waitTransactionReceipt = (txHash: string) => waitAsyncResult({ fetcher: () => isTransactionReceipt(txHash), interval: 2 });
