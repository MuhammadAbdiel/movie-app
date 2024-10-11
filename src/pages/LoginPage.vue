<template>
  <q-page class="flex flex-center">
    <div class="login-container">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h4 text-center q-mb-md">Sign in</div>

          <q-input filled label="Email" v-model="email" class="q-mb-md" dense />

          <q-input filled label="Password" type="password" v-model="password" class="q-mb-md" dense />

          <q-checkbox v-model="rememberMe" label="Remember me" class="q-mb-md" />

          <q-btn label="Login" color="primary" class="full-width" @click="submitLogin" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Mendefinisikan state menggunakan ref
const email = ref<string>('')
const password = ref<string>('')
const rememberMe = ref<boolean>(false)

// Fungsi untuk menangani login
const submitLogin = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Remember Me:', rememberMe.value)
}

defineOptions({
  name: 'LoginPage',
})
</script>