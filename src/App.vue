<template>
  <main>
    <header class="row items-center full-width justify-between q-py-sm q-px-md">
      <q-btn-dropdown split color="teal-5" unelevated rounded no-caps icon="public" :label="`${walletStore.network.name.slice(0,3)}...`">
        <q-list>
          <q-item clickable v-close-popup @click="onNetworkCheck(network.chainId)" v-for="network in networks" @key="network">
            <q-item-section>
              <q-item-label>{{ network.name }}</q-item-label>
              <q-item-label caption>{{ network.chainId }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-avatar size="40px">
        <template #default>
          <q-icon name="savings" color="pink-5" size="2em"></q-icon>
        </template>
      </q-avatar>
    </header>
    <q-separator />
    <div class="q-px-md full-height scroll">
      <RouterView />
    </div>
  </main>
</template>
<script setup lang="ts">
import router from "./router";
import { onMounted, ref } from "vue";
import { RouterLink, RouterView } from 'vue-router';
import {createCipher, decryptCipher} from "@/composables/crypto";
import {networks, setNetwork} from "@/composables/network-change"
import useHash from "./composables/hash";
import {useWalletStore} from "@/stores/wallet"

const walletStore = useWalletStore();
const loading = ref(true);
const onNetworkCheck = (chainId: number) => {
  let index = networks.findIndex(a => a.chainId == chainId)
  if (index > -1) {
    setNetwork(networks[index].chainId)
    walletStore.network = (networks[index]);
  }
}
onMounted(() => {
  
  let password = localStorage.getItem(useHash('password'));
  let signin = localStorage.getItem(useHash('signin'));
  console.log(password);
  
  // if (!password) {
  //   router.push("/signup")
  // } else {
  //   if (condition) {
      
  //   }
  // }
  let currentNetwork = localStorage.getItem(useHash('network'));
  if (currentNetwork === null) {
    setNetwork(networks[0].chainId)
    walletStore.network = (networks[0]);
  } else {
    let text = decryptCipher(currentNetwork)
    walletStore.network = JSON.parse(text);
  }
});
</script>

<style scoped>
main {
  width: 100%;
  height: 600px;
}
</style>
