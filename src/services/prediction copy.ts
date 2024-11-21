// import {
//     selector,
//     selectorFamily,
//     useRecoilRefresher_UNSTABLE,
//     useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
//   } from "recoil";
//   import { fetchChain, fetchMulticall, withErrorCache } from "@utils/fetch";
//   import { PredictionContract } from "@contracts/index";
//   import {
//     AuthConnectStatus,
//     useAuthConnect,
//   } from "@modules/AuthConnectButton/useAuthConnect";
//   import { useParams } from "react-router-dom";
//   import { waitTransactionReceipt } from "@utils/checkTransaction";
//   import { sendTransaction } from "@cfx-kit/react-utils/dist/AccountManage";
//   import { Unit } from "@cfxjs/use-wallet-react/ethereum";
//   import { useAutoRefreshData } from "@cfx-kit/react-utils/dist/recoilUtils";
//   import { useCallback, useLayoutEffect, useRef, useState } from "react";
//   import { DEFAULT_POLLING_INTERVAL } from "@constants/index";
  
//   const _fetchPrediction = async (pid: string) => {
//     const predictionContract = PredictionContract(parseInt(pid));
//     try {
//       const fetchRes = await fetchChain<string>({
//         params: [
//           {
//             data: predictionContract.encodeFunctionData("getPrediction", [
//               BigInt(0),
//             ]),
//             to: predictionContract.address,
//           },
//           "latest",
//         ],
//       });
//       const response = predictionContract.decodeFunctionResult(
//         "getPrediction",
//         fetchRes
//       )[0];
//       if (!response) {
//         console.log("get prediction success but no response");
//         return null;
//       }
//       return response;
//     } catch (err) {
//       console.log("get prediction failed:", err);
//       throw err;
//     }
//   };
//   const { fetcher: fetchPrediction, setFetchType: setPredictionFetchType } =
//     withErrorCache("fetchPrediction", _fetchPrediction);
  
//   const PredictionSelecter = selectorFamily({
//     key: `PredictionState-${import.meta.env.MODE}`,
//     get: (pid?: string) => async () => {
//       if (!pid) return null;
//       return fetchPrediction(pid);
//     },
//   });
  
//   export const usePrediction = (pid?: ValidNumber) => {
//     const { id } = useParams<{ id: string }>();
//     return useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
//       PredictionSelecter(String(pid || id))
//     );
//   };
//   export const useRefreshPrediction = (pid?: ValidNumber) => {
//     const { id } = useParams<{ id: string }>();
//     const refresh = useRecoilRefresher_UNSTABLE(
//       PredictionSelecter(String(pid || id))
//     );
//     return useCallback(() => {
//       setPredictionFetchType("Manual");
//       refresh();
//     }, [refresh]);
//   };
  
//   export const useAutoRefreshPrediction = (pid?: ValidNumber) => {
//     const { id } = useParams<{ id: string }>();
//     useAutoRefreshData({
//       recoilValue: PredictionSelecter(String(pid || id)),
//       interval: DEFAULT_POLLING_INTERVAL,
//       refreshImmediately: true,
//     });
//   };
  
//   export type PredictionData = Exclude<ReturnType<typeof usePrediction>, null>;
  
//   const _fetchUserVotes = async (pid: string, address: `0x${string}`) => {
//     const predictionContract = PredictionContract(parseInt(pid));
    
//     try {
//       const fetchRes = await fetchChain<string>({
//         params: [
//           {
//             data: predictionContract.encodeFunctionData("userBets", [
//               BigInt(0),
//               address,
//             ]),
//             to: predictionContract.address,
//           },
//           "latest",
//         ],
//       });
//       const response = predictionContract.decodeFunctionResult(
//         "userBets",
//         fetchRes
//       )[0];
//       if (!response) {
//         console.log("get user votes but no response");
//         return [];
//       }
//       return response;
//     } catch (err) {
//       console.log("get user votes failed:", err);
//       throw err;
//     }
//   };
//   const { fetcher: fetchUserVotes, setFetchType: setUserVotesFetchType } =
//     withErrorCache("fetchUserVotes", _fetchUserVotes);
  
//   const UserVotesSelecter = selectorFamily({
//     key: `UserVotesState-${import.meta.env.MODE}`,
//     get: (pidAndAddress: string) => async () => {
//       const [pid, address] = pidAndAddress.split("|");
//       if (!pid || !address) return null;
//       return fetchUserVotes(pid, address as `0x${string}`);
//     },
//   });
  
//   export const useUserVotes = () => {
//     const { authConnectStatus, account } = useAuthConnect();
//     const { id } = useParams<{ id: string }>();
//     return useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
//       UserVotesSelecter(
//         `${id ?? ""}|${
//           authConnectStatus === AuthConnectStatus.Connected ? account : ""
//         }`
//       )
//     );
//   };
//   export const useRefreshUserVotes = () => {
//     const { authConnectStatus, account } = useAuthConnect();
//     const { id } = useParams<{ id: string }>();
//     const refresh = useRecoilRefresher_UNSTABLE(
//       UserVotesSelecter(
//         `${id ?? ""}|${
//           authConnectStatus === AuthConnectStatus.Connected ? account : ""
//         }`
//       )
//     );
//     return useCallback(() => {
//       setUserVotesFetchType("Manual");
//       refresh();
//     }, [refresh]);
//   };
  
//   export const useAutoRefreshUserVotes = () => {
//     const { authConnectStatus, account } = useAuthConnect();
//     const { id } = useParams<{ id: string }>();
//     useAutoRefreshData({
//       recoilValue: UserVotesSelecter(
//         `${id ?? ""}|${
//           authConnectStatus === AuthConnectStatus.Connected ? account : ""
//         }`
//       ),
//       interval: DEFAULT_POLLING_INTERVAL,
//       refreshImmediately: true,
//     });
//   };
  
//   const defaultClaimInfo = {
//     userClaimableAmount: 0n,
//     isUserClaimed: false,
//   };
  
//   const _fetchUserClaimInfo = async (pid: string, address: `0x${string}`) => {
//     const predictionContract = PredictionContract(parseInt(pid));
//     try {
//       const multicallResponse = await fetchMulticall([
//         [
//           predictionContract.address,
//           predictionContract.encodeFunctionData("userClaimableAmount", [
//             BigInt(0),
//             address,
//           ]),
//         ],
//         [
//           predictionContract.address,
//           predictionContract.encodeFunctionData("isUserClaimed", [
//             BigInt(0),
//             address,
//           ]),
//         ],
//       ]);
//       if (!multicallResponse) {
//         console.log("get user claim info but no response");
//         return defaultClaimInfo;
//       }
//       const userClaimableAmount = predictionContract.decodeFunctionResult(
//         "userClaimableAmount",
//         multicallResponse[0]
//       )[0];
//       const isUserClaimed = predictionContract.decodeFunctionResult(
//         "isUserClaimed",
//         multicallResponse[1]
//       )[0];
//       return {
//         userClaimableAmount,
//         isUserClaimed,
//       };
//     } catch (err) {
//       console.log("get user claim info failed:", err);
//       throw err;
//     }
//   };
//   const { fetcher: fetchUserClaimInfo, setFetchType: setClaimInfoFetchType } =
//     withErrorCache("fetchUserClaimInfo", _fetchUserClaimInfo);
  
//   const UserClaimInfoSelecter = selectorFamily({
//     key: `UserClaimInfoState-${import.meta.env.MODE}`,
//     get: (pidAndAddress: string) => async () => {
//       const [pid, address] = pidAndAddress.split("|");
//       if (!pid || !address) return defaultClaimInfo;
//       return fetchUserClaimInfo(pid, address as `0x${string}`);
//     },
//   });
  
//   export const useUserClaimInfo = () => {
//     const { authConnectStatus, account } = useAuthConnect();
//     const { id } = useParams<{ id: string }>();
//     return useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
//       UserClaimInfoSelecter(
//         `${id ?? ""}|${
//           authConnectStatus === AuthConnectStatus.Connected ? account : ""
//         }`
//       )
//     );
//   };
//   export const useRefreshUserClaimInfo = () => {
//     const { authConnectStatus, account } = useAuthConnect();
//     const { id } = useParams<{ id: string }>();
//     const refresh = useRecoilRefresher_UNSTABLE(
//       UserClaimInfoSelecter(
//         `${id ?? ""}|${
//           authConnectStatus === AuthConnectStatus.Connected ? account : ""
//         }`
//       )
//     );
//     return useCallback(() => {
//       setClaimInfoFetchType("Manual");
//       refresh();
//     }, [refresh]);
//   };
  
//   export const useAutoRefreshUserClaimInfo = () => {
//     const { authConnectStatus, account } = useAuthConnect();
//     const { id } = useParams<{ id: string }>();
//     useAutoRefreshData({
//       recoilValue: UserClaimInfoSelecter(
//         `${id ?? ""}|${
//           authConnectStatus === AuthConnectStatus.Connected ? account : ""
//         }`
//       ),
//       interval: DEFAULT_POLLING_INTERVAL,
//       refreshImmediately: true,
//     });
//   };
  
//   const _fetchBlockTime = async () => {
//     const { timestamp } = await fetchChain<{ timestamp: `0x${string}` }>({
//       method: "eth_getBlockByNumber",
//       params: ["latest", true],
//     });
//     return timestamp;
//   };
//   const { fetcher: fetchBlockTime } = withErrorCache(
//     "fetchBlockTime",
//     _fetchBlockTime
//   );
  
//   const BlockTimeSelector = selector({
//     key: `BlockTimeState-${import.meta.env.MODE}`,
//     get: fetchBlockTime,
//   });
  
//   export const useAutoRefreshBlockTime = () => {
//     return useAutoRefreshData({
//       recoilValue: BlockTimeSelector,
//       interval: DEFAULT_POLLING_INTERVAL,
//       refreshImmediately: true,
//     });
//   };
  
//   export const useLocalBlockTime = () => {
//     const _blockTime =
//       useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(BlockTimeSelector);
//     const blockTime = _blockTime ? Number(_blockTime) : 0;
//     const blockTimeRef = useRef(blockTime);
//     const [_localDiff, setLocalDiff] = useState(0);
//     const localDiff = blockTimeRef.current !== blockTime ? 0 : _localDiff;
//     useLayoutEffect(() => {
//       if (!blockTime) {
//         return;
//       }
//       blockTimeRef.current = blockTime;
//       setLocalDiff(0);
//       const timer = setInterval(() => {
//         setLocalDiff((prev) => prev + 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }, [blockTime]);
//     return blockTime + localDiff;
//   };
  
//   export const bet = async ({
//     pid,
//     option,
//     value,
//   }: {
//     pid: ValidNumber;
//     option: number;
//     value: ValidNumber;
//   }) => {
//     const predictionContract = PredictionContract(parseInt(pid.toString()));
//     const txHash = await sendTransaction({
//       data: predictionContract.encodeFunctionData("bet", [BigInt(0), option]),
//       to: predictionContract.address,
//       value: Unit.fromStandardUnit(value).toHexMinUnit(),
//     });
//     const { promise } = waitTransactionReceipt(txHash);
//     return { txHash, wait: () => promise };
//   };
  
//   export const claim = async (pid: ValidNumber) => {
//     const predictionContract = PredictionContract(parseInt(pid.toString()));
//     const txHash = await sendTransaction({
//       data: predictionContract.encodeFunctionData("claim", [BigInt(0)]),
//       to: predictionContract.address,
//     });
//     const { promise } = waitTransactionReceipt(txHash);
//     await promise;
//     return txHash;
//   };
  