<template>
  <q-card @click="handleClick" class="col-lg-3 col-md-6 col-sm-12 movie-card text-white cursor-pointer">
    <div class="q-pa-md">
      <q-img width="265" height="400" class="rounded-borders" :src="movie.poster || 'https://picsum.photos/200/300'"
        :alt="movie.title" />
    </div>
    <q-card-section>
      <div class="body-large">{{ movie.title }}</div>
      <div class="body-small">{{ movie.publishingYear }}</div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
export default {
  name: 'CardComponent',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('edit-movie', this.movie.id);
    }
  }
}
</script>
