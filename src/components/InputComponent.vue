<template>
  <q-input :input-class="inputClass" :label-color="labelColor" :color="color" :filled="filled" :label="label"
    :type="type" :rules="rules" :dense="dense" class="q-mb-md input" :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CustomPasswordInput',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: 'text-white'
    },
    labelColor: {
      type: String,
      default: 'white'
    },
    color: {
      type: String,
      default: 'white'
    },
    filled: {
      type: Boolean,
      default: true
    },
    type: {
      type: String as PropType<'email' | 'password' | 'text' | 'number'>,
      default: 'text'
    },
    rules: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue']
});
</script>
