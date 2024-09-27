/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { waitTransactionReceipt } from '@utils/checkTransaction';

const useInTransaction = <T extends (params: any) => void | Promise<any> | null | undefined>(transactionFunc: T, waitTxHash = false) => {
  const [inTransaction, setInTransaction] = useState(false);
  const execTransaction = useCallback(
    async (params: any) => {
      try {
        setInTransaction(true);
        const res = await transactionFunc(params);
        if (waitTxHash === true && typeof res === 'string') {
          const { promise } = waitTransactionReceipt(res);
          await promise;
        }
        setInTransaction(false);
        return res;
      } catch (err) {
        setInTransaction(false);
        throw err;
      }
    },
    [transactionFunc, waitTxHash]
  ) as T;
  return { inTransaction, execTransaction };
};

export default useInTransaction;
