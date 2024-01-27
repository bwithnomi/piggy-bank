<template lang="">
  <div class="full-height column justify-center">
    <h4 class="text-center text-h4 q-mb-none">Reset password</h4>
    <p class="text-body1 text-center text-red text-bold">Enter Pass phrase</p>

    <div class="">
      
      <q-banner rounded class="bg-red text-center text-white q-py-sm q-mb-md" v-if="invalidPhrase">
        Invalid Pass phrase
      </q-banner>
      <q-form  @submit.prevent ref="form" :greedy="true">  
        <q-input standout="bg-teal text-white" :rules="[rules.required]" class="q-mb-md" v-model="passphrase" label="Enter your 12 words passphrase" :dense="true"/>
        <q-input standout="bg-teal text-white" :rules="[rules.required]" class=" q-mb-sm" v-model="password" label="New password" :dense="true"/>
        <q-input standout="bg-teal text-white" :rules="[rules.required, val => val == password || 'Password do not match']" class="q-mb-md" v-model="confirmPssword" label="Confirm password" :dense="true"/>
        <q-btn class="full-width q-mt-md" @click="submitForm" color="teal" icon="lock" text-color="white" label="Update" />
      </q-form>
      <div class="row justify-between">
        <q-btn to="/" flat color="primary" label="Go back" size="sm" class="q-mt-md q-mx-auto" />
        <q-btn to="/signup" flat color="primary" label="Create new wallet" size="sm" class="q-mt-md q-mx-auto" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { ethers } from "ethers"
import { QForm } from "quasar";
import router from "@/router"
import rules from "@/composables/validation-rules"
import useHash from "@/composables/hash"
import { createCipher, decryptCipher } from "@/composables/crypto";
import type { Account } from "@/composables/account";

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
        let accounts = localStorage.getItem(useHash('accounts'));
        const account: Account = {
          address: wallet.address,
          private_key: createCipher(wallet.privateKey),
        }
        if (!accounts) {
          console.log('no account');
          // localStorage.setItem(useHash('accounts'), createCipher(JSON.stringify([account])));
          // localStorage.setItem(useHash('password'), createCipher(password.value));
          // localStorage.setItem(useHash('signin'), createCipher("true"));
          invalidPhrase.value = true
        } else {
          console.log('found account');
          let res = decryptCipher(accounts)
          if (res) {
          console.log(res);
            let existingAccounts = JSON.parse(res) as Account[];
            let index = existingAccounts.findIndex(a => a.address == account.address);
            if (index > -1) {
              localStorage.setItem(useHash('password'), createCipher(password.value));
              localStorage.setItem(useHash('signin'), createCipher("true"));
              invalidPhrase.value = false
              router.push({ path: "/" })
            } else {
              invalidPhrase.value = true
            }
          } else {
            invalidPhrase.value = true
          }
        }
      } catch (error) {
        invalidPhrase.value = true
      }

    }
  })
}
onMounted(async () => {
  // const walet = ethers.Wallet.fromMnemonic("blind cliff swing risk solve half adapt slab grace chest hockey guess");
  // console.log(await walet.getAddress());

  // // const walet = ethers.Wallet.createRandom();
  // // walet.encrypt("dsaasd", )
  // console.log(walet._mnemonic().phrase);


})
</script>
<style lang="">
  
</style>@/composables/account