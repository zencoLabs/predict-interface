import { createFetchChain } from "@cfx-kit/dapp-utils/dist/fetch";
import { MulticallContract } from "@contracts/index";

export const fetchChain = createFetchChain(import.meta.env.VITE_ESpaceRpcUrl);

export const fetchMulticall = async (
  _data: string[][]
): Promise<readonly `0x${string}`[] | null> => {
  const data = _data.map((item) => ({
    target: item[0] as `0x${string}`,
    callData: item[1] as `0x${string}`,
  }));
  const fetchRes = await fetchChain<string>({
    params: [
      {
        data: MulticallContract.encodeFunctionData("aggregate", [data]),
        to: MulticallContract.address,
      },
      "latest",
    ],
  });
  const res = MulticallContract.decodeFunctionResult("aggregate", fetchRes);
  return res[1] || null;
};

export type FetchType = "Init" | "Manual" | "Auto";

const responseMap = new Map<string, unknown>();
/**
 * cache reponse after request, return the cache while new request was failed and fetchType === 'Auto'
 */
export const withErrorCache = <
  T extends (...params: any) => Promise<unknown> | null | undefined
>(
  key: string,
  fetcher: T
) => {
  let fetchType: FetchType = "Init";
  return {
    fetcher: (async (...args: any[]) => {
      let cacheKey: string | null;
      const _fetchType = fetchType;
      fetchType = "Auto";
      try {
        cacheKey = key + JSON.stringify(args);
      } catch (_) {
        cacheKey = null;
      }
      try {
        const response = await fetcher(...args);
        cacheKey && responseMap.set(cacheKey, response);
        return response;
      } catch (error) {
        if (cacheKey && _fetchType === "Auto") {
          const cachedResult = responseMap.get(cacheKey);
          if (cachedResult) {
            return cachedResult;
          }
        }
        throw error;
      }
    }) as T,
    setFetchType: (_fetchType: FetchType) => (fetchType = _fetchType),
  };
};
