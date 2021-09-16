import type { ApiPromise } from "@polkadot/api";

export interface State {
  endpoint: string;
  events: any;
  api?: ApiPromise;
}

export const initialState: State = {
  endpoint: "wss://rpc.polkadot.io",
  events: null,
  api: undefined
};
