<template>
  <div class="q-py-md">
    <div class="column items-center">
      <q-btn size="sm" color="teal-6" icon-right="content_copy" no-caps outline unelevated rounded
        :label="`${currentAccount?.address.slice(0, 4)}...${currentAccount?.address.slice(currentAccount?.address.length - 4, currentAccount?.address.length)}`"
        @click="copyToClipboard(currentAccount?.address)">
        <q-tooltip class="bg-teal-6">Copy to clipboard</q-tooltip>
      </q-btn>
      <p class="text-h4 q-mt-sm">{{ `${balance}${network.curreny_symbol}` }}</p>
    </div>
    <q-separator />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { useWalletStore } from "@/stores/wallet"
import copyToClipboard from "@/composables/clipboard"
import { decryptCipher } from "@/composables/crypto";
import { getSigner } from "@/composables/signer";
import { ethers } from "ethers"
import { storeToRefs } from "pinia";

const walletStore = useWalletStore();
const rawBalance = ref<ethers.BigNumber>(ethers.BigNumber.from(0))
const balance = computed(() => {
  return ethers.utils.formatEther(rawBalance.value);
})
const { network } = storeToRefs(walletStore)
const currentAccount = walletStore.getCurrentAccount;
const provider = computed(() => {
  return new ethers.providers.StaticJsonRpcProvider(network.value.rpc)
});
let private_key = walletStore.getCurrentAccount?.private_key || null;
private_key = decryptCipher(private_key || "")
const signer = computed(() => {
  return new ethers.Wallet(private_key || "", provider.value)
});
watch(network, async () => {
  rawBalance.value = ethers.BigNumber.from(0)
  rawBalance.value = await signer.value.getBalance();

});
onMounted(async () => {
  rawBalance.value = await signer.value.getBalance()

})
</script>