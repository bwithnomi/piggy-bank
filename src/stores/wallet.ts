import type { Account } from '@/composables/account';
import type { Network } from '@/composables/network-change';
import { defineStore } from 'pinia'

export const useWalletStore = defineStore({
  id: "wallet",
  state: () => ({
    network: {
      name: "",
      rpc: "",
      chainId: 0,
      explorer_url: "",
      curreny_symbol: ""
    } as Network,
    accounts: [] as Account[],
    currentAccount: {} as Account,
  }),
  getters: {
    getCurrentAccount(): Account | null {
      if (this.accounts.length > 0) {
        return this.accounts[0]
      }
      return null;
    }
  },
  actions: {
  },
  persist: true,
})

