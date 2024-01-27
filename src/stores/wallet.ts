import type { Account } from '@/composables/account';
import type { Network } from '@/composables/network-change';
import { ref, computed } from 'vue'
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
  })
})
