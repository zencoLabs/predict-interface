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
  address: isProduction
    ? "0xD7a71227A19a6474a9E96AA6388B4b934A08e05E"
    : "0x7584D0A350B92B8Bc5ef797cf45006dBF11d31C1",
  ABI: PredictionABI,
});


// export const PredictionContract = (contractId: number) => {
//   const addresses: { [key: number]: { production: string; development: string } } = {
//     0: {
//       production: "0x378396EE652CB8BE5A7ACDD40c697912415822Af",
//       development: "0x0d65fdC70C6475406786e13C614F43Bb46B22aC9",
//     },
//     1: {
//       production: "0x378396EE652CB8BE5A7ACDD40c697912415822Af",
//       development: "0x0d65fdC70C6475406786e13C614F43Bb46B22aC9",
//     },
    
//   };

//   const selectedAddress = isProduction ? addresses[contractId].production : addresses[contractId].development;

//   return createContract({
//     address: selectedAddress,
//     ABI: PredictionABI,
//   });
// };
