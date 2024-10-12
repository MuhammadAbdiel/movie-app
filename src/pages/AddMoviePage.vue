<template>
  <q-page class="row full-width q-px-xl q-py-xl">
    <div class="col">
      <span :class="headingClass" class="text-white q-mr-md">{{ $t('createNewMovie') }}</span>

      <div class="row q-gutter-xl q-mt-md q-pt-md text-white">
        <h1>1</h1>
        <h1>2</h1>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';

export default {
  name: 'AddMoviePage',
  setup() {
    const $q = useQuasar();

    const headingClass = $q.screen.lt.md ? 'heading-three' : 'heading-two';

    return {
      $q,
      headingClass,
    }
  },
}
</script>

<style lang="scss"></style>