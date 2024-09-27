import { createContract } from "@cfx-kit/dapp-utils/dist/contract";
import PredictionABI from "./abis/prediction";
import MulticallABI from "./abis/Multicall";
import { isProduction } from "@utils/is";

export const MulticallContract = createContract({
  address: isProduction
    ? "0x9f208d7226f05b4f43d0d36eb21d8545c3143685"
    : "0xd59149a01f910c3c448e41718134baeae55fa784",
  ABI: MulticallABI,
});

export const PredictionContract = createContract({
  // TODO: production address
  address: isProduction
    ? "0x7584D0A350B92B8Bc5ef797cf45006dBF11d31C1"
    : "0x7584D0A350B92B8Bc5ef797cf45006dBF11d31C1",
  ABI: PredictionABI,
});
