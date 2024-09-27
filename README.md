# predict-interface

## environment

```
node >= 18.18.2
npm >= 9.8.1
```

## install

```bash
yarn install
```

## development

```bash
# default is evm-testnet
yarn dev

# use mode to specify the env
yarn dev --mode production
```

## build

```bash
# for evm-testnet
yarn build:testnet

# for evm
yarn build
```

## config

### chain
```bash
# you can edit chain config in .env.XXX
# development is for evm-testnet
VITE_ESpaceRpcUrl=https://evmtestnet.confluxrpc.com
VITE_ESpaceScanUrl=https://evmtestnet.confluxscan.io
VITE_ESpaceChainID=71

# production is for evm
VITE_ESpaceRpcUrl=https://evm.confluxrpc.com
VITE_ESpaceScanUrl=https://evm.confluxscan.io
VITE_ESpaceChainID=1030

```

### contract
```ts
// you can edit contract config in /src/contracts/index.ts
export const MulticallContract = createContract({
  address: isProduction
    ? "0x9f208d7226f05b4f43d0d36eb21d8545c3143685"
    : "0xd59149a01f910c3c448e41718134baeae55fa784",
  ABI: MulticallABI,
});
export const PredictionContract = createContract({
  address: isProduction
    ? "0x7584D0A350B92B8Bc5ef797cf45006dBF11d31C1"
    : "0x7584D0A350B92B8Bc5ef797cf45006dBF11d31C1",
  ABI: PredictionABI,
});

```
