<template>
  <q-page class="row items-center justify-center fit q-px-lg">
    <q-col cols="12" lg="8" class="login-container">
      <div :class="headingClass" class="text-white mb-3 q-mb-xl text-center">{{ $t('signin') }}</div>

      <q-form @submit="onSubmit" @reset="onReset" ref="form">
        <q-input input-class="text-white" label-color="white" color="white" filled :label="$t('email')"
          v-model="form.email" :rules="[validateEmail]" type="email" class="q-mb-md input" dense />

        <q-input input-class="text-white" label-color="white" color="white" filled :label="$t('password')"
          type="password" :rules="[validatePassword]" v-model="form.password" class="q-mb-md input" dense />

        <q-checkbox v-model="form.remember" keep-color color="primary" :label="$t('rememberMe')"
          class="q-mb-md text-white flex flex-center full-width body-small" />

        <q-btn :loading="loading" :label="$t('login')" type="submit" no-caps color="primary"
          class="full-width body-regular" />
      </q-form>

    </q-col>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { useI18n } from 'vue-i18n'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      loading: false
    };
  },
  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const { t } = useI18n();
    const headingClass = $q.screen.lt.md ? 'heading-two' : 'heading-one';

    return {
      $q,
      authStore,
      t,
      headingClass
    };
  },
  methods: {
    validateEmail(val: string) {
      if (val.length < 5) {
        return this.t('emailValidation');
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(val) || this.t('invalidEmail');
    },

    validatePassword(val: string) {
      if (val.length < 6) {
        return this.t('passwordValidation');
      }

      return true;
    },
    async onSubmit() {
      const form = this.$refs.form as unknown as { validate: () => boolean };
      if (form.validate()) {
        this.loading = true;

        try {
          const response = await this.$api.post('/login', this.form);

          this.authStore.setAuth(response.data?.data);

          this.$q.notify({
            color: 'positive',
            message: response.data.message
          });

          this.$router.push({ name: 'movies' });
        } catch (error: any) {
          this.$q.notify({
            color: 'negative',
            message: error?.response?.data?.message
          });
        } finally {
          this.loading = false;
        }

        this.onReset();
      }
    },
    onReset() {
      const form = this.$refs.form as unknown as { resetValidation: () => boolean };
      form.resetValidation();
      this.form = {
        email: '',
        password: '',
        remember: false
      };
    }
  }
}
</script>

<style lang="scss">
.q-field__inner {
  border-radius: 10px;
}

.text-negative {
  color: $error !important;
}

.q-field--error .q-field__bottom {
  color: $error !important;
}

.login-container {
  width: 20em;
}

.input {
  background-color: $input;
}
</style>