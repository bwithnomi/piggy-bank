<template lang="">
  <div class="full-height column justify-center">
    
    <div class="row items-center justify-center">
      <q-avatar size="100px">
        <template #default>
          <q-icon name="savings" color="pink-5" size="2em"></q-icon>
        </template>
      </q-avatar>
    </div>
    <h4 class="text-center text-h4 q-mb-none">Welcome Back</h4>
    <p class="text-body1 text-center text-red text-bold">One crypto at a time!</p>

    <q-banner rounded class="bg-red text-center text-white q-py-sm q-my-md" v-if="invalidPassword">
        Invalid Password
      </q-banner>
    <div class="">
      <q-form  @submit.prevent ref="form" :greedy="true">
        <q-input standout="" v-model="text" label="Enter your password" :dense="true"/>
        <q-btn class="full-width q-mt-md" color="teal" icon="lock" text-color="white" label="Unlock" @click="signin"/>
      </q-form>
      <div class="row justify-center">
        <q-btn to="/forgot-password" flat color="primary" label="Forgot password?" size="sm" class="q-mt-md q-mx-auto" />
      </div>
      
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import router from "@/router";
import { QForm } from "quasar";
import useHash from "@/composables/hash"
import { createCipher, decryptCipher } from "@/composables/crypto";

const invalidPassword = ref(false)
const form = ref<QForm>()
const text = ref<string>("")
const signin = async () => {
  form.value?.validate().then(s => {
    if (s) {
      let pass = localStorage.getItem(useHash("password"));
      
      if (decryptCipher(pass || "") == text.value) {
        localStorage.setItem(useHash("signin"),createCipher("true"));
        router.push({name: "home"})
      } else {
        invalidPassword.value = true
      }
    }
  })
}
</script>
<style lang="">
  
</style>