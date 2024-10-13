<template>
  <q-btn @click="$emit('click')" :loading="loading" :label="label" :type="type" no-caps :color="color"
    :class="[customClass, buttonClass]" />
</template>

<script lang="ts">
export default {
  name: 'ButtonComponent',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Login'
    },
    color: {
      type: String,
      default: 'primary'
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'submit'
    }
  },
  computed: {
    buttonClass() {
      return this.fullWidth ? 'full-width body-regular' : 'body-regular';
    }
  }
}
</script>

<style lang="scss">
.cancel-button {
  border: 2px solid white;
}
</style>
