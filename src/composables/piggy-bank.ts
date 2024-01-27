import type { Network } from "./network-change";

export type PiggyBankInpageProvider = {
  isPiggyBank: boolean;
  network: Network;
  accounts: any[];
}