<template lang="">
  <div v-if="loading" class="full-height column items-center justify-center">
        <q-spinner-clock
          color="teal"
          size="4em"
        />
  </div>
  <div class="full-height column justify-center" v-else>
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
  <div class="">
    <p>{{ mnemonic }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { ethers } from "ethers"
import { QForm } from "quasar";
import router from "@/router"
import rules from "@/composables/validation-rules"
import useHash from "@/composables/hash"
import createAccount from "@/composables/create-account"
import { createCipher } from "@/composables/crypto";
import type { Account } from "@/composables/account";

const loading = ref(false);
const confirmed = async () => {
  loading.value = true;
  let wallet = createAccount();
  mnemonic.value = wallet._mnemonic().phrase;
}
const mnemonic = ref("");

// blind cliff swing risk solve half adapt slab grace chest hockey guess
const form = ref<QForm>()
const passphrase = ref<string>("")
const password = ref<string>("")
const confirmPssword = ref<string>("")
const invalidPhrase = ref(false)
const submitForm = async () => {
  form.value?.validate().then(async (s: boolean) => {
    if (s) {
      try {
        const wallet = ethers.Wallet.fromMnemonic(passphrase.value);
        const account: Account = {
          address: wallet.address,
          private_key: createCipher(wallet.privateKey),
        }
        localStorage.setItem(useHash('password'), createCipher(password.value));
        localStorage.setItem(useHash('accounts'), createCipher(JSON.stringify([account])));
        localStorage.setItem(useHash('signin'), createCipher("true"));
        invalidPhrase.value = false
        router.push({ path: "/" })
      } catch (error) {
        invalidPhrase.value = true
      }

    }
  })
}
onMounted(async () => {
  // const wallet = ethers.Wallet.fromMnemonic("blind cliff swing risk solve half adapt slab grace chest hockey guess");
  // console.log(await wallet.getAddress());

  // // const wallet = ethers.Wallet.createRandom();
  // // wallet.encrypt("dsaasd", )
  // console.log(wallet._mnemonic().phrase);


})
</script>
<style lang="">
  
</style>