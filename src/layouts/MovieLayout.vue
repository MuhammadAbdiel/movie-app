<template>
  <q-layout view="lHh Lpr lFf" class="background relative-position">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-btn @click="changeLocale" :label="$t('changeLocale')" type="button" no-caps color="primary"
      class="floating-button" />

    <div class="custom-shape-divider-bottom-1728701015">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          class="shape-fill"></path>
      </svg>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'

export default {
  name: 'MovieLayout',
  setup() {
    const { locale } = useI18n({ useScope: 'global' })
    const { t } = useI18n();

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'id-ID', label: 'Indonesia' }
      ],
      t
    }
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.locale === 'en-US' ? 'id-ID' : 'en-US'
    }
  }
}
</script>

<style lang="scss">
.q-btn {
  border-radius: 10px;
}

.background {
  background-color: $background;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.custom-shape-divider-bottom-1728701015 {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom-1728701015 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 102px;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1728701015 .shape-fill {
  fill: #E5E5E521;
}
</style>
