<template lang="">
  <div v-if="loading" class="full-height column items-center justify-center">
        <q-spinner-clock
          color="teal"
          size="4em"
        />
  </div>
  <div class="full-height column justify-center" v-else-if="!loading && createAccountCheck">
    <h4 class="text-center text-h4 q-mb-none">Are you sure to reset current wallet?</h4>
    <p class="text-body1 text-center text-red text-bold">Drag the bar below from left to right for confirmation</p>

    <div class="">
      <q-slide-item @left="confirmed" left-color="teal">
        <template v-slot:left>
          <div class="row">
            <q-icon name="verified" />
          <q-item-section class="text-center">Confirmed </q-item-section>
          </div>
        </template>

        <q-item>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="drag_indicator" />
          </q-item-section>
          <q-item-section class="text-center">Confirm Please</q-item-section>
        </q-item>
      </q-slide-item>
    </div>
  </div>
  <!--  -->
  <div class="full-height column justify-center" v-else-if="!loading && !createAccountCheck">
    <q-banner class="bg-pink-2 text-white q-mb-sm" rounded>
      <template v-slot:avatar>
        <q-icon name="account_balance_wallet" color="pink-7" />
      </template>
      {{ mnemonic }}
      <template v-slot:action>
        <q-btn color="pink-6" unelevated label="Copy" text-color="white" no-caps @click="copyToClipboard(mnemonic)" />
      </template>
    </q-banner>
    <q-banner class="bg-teal-3 text-white q-mb-md" style="word-break: break-all;" rounded>
      <template v-slot:avatar>
        <q-icon name="security" color="teal-7" />
      </template>
      {{ account.private_key }}
      <template v-slot:action>
        <q-btn color="teal-6" unelevated label="Copy" text-color="white" no-caps @click="copyToClipboard(account.private_key)" />
      </template>
    </q-banner>
    <q-btn label="Go to home" color="teal" :to="{name: 'home'}"></q-btn>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { ethers } from "ethers"
import { QForm } from "quasar";
import router from "@/router"
import rules from "@/composables/validation-rules"
import useHash from "@/composables/hash"
import createAccount from "@/composables/create-wallet"
import { createCipher } from "@/composables/crypto";
import type { Account } from "@/composables/account";
import { useWalletStore } from "@/stores/wallet"
import copyToClipboard from "@/composables/clipboard"

const walletStore = useWalletStore();
const loading = ref(false);
const createAccountCheck = ref(true);
const confirmed = async () => {
  loading.value = true;
  let wallet = createAccount();
  mnemonic.value = wallet._mnemonic().phrase;
  account.value.private_key = createCipher(wallet.privateKey);
  account.value.address = wallet.address;
  localStorage.setItem(useHash('password'), createCipher(""));
  localStorage.setItem(useHash('accounts'), createCipher(JSON.stringify([account.value])));
  localStorage.setItem(useHash('signin'), createCipher("true"));
  walletStore.accounts = [account.value];
  loading.value = false;
  createAccountCheck.value = false;
}
const account = ref<Account>({
  address: "",
  private_key: ""
})
const mnemonic = ref("");

// blind cliff swing risk solve half adapt slab grace chest hockey guess
//merry flame athlete blanket rose banner ensure circle tuna later exhibit shine
//either ability tell eagle honey unknown kiwi flower pepper chaos settle engage
//spring pelican frog lobster blame sunny sponsor census toy mobile ranch simple
const form = ref<QForm>()
const passphrase = ref<string>("")
const password = ref<string>("")
const confirmPssword = ref<string>("")
const invalidPhrase = ref(false)
onMounted(async () => {
})
</script>
<style lang="">
  
</style>@/composables/create-wallet