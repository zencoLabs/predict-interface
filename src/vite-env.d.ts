/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_ESpaceRpcUrl: string;
  readonly VITE_ESpaceScanUrl: string;
  readonly VITE_ESpaceChainID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type ValidNumber = number | string | bigint;