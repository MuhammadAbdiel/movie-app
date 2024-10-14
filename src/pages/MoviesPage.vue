<template>
  <q-page class="justify-center items-center full-width q-px-xl q-py-xl">
    <div v-if="loading == false">
      <div v-if="movieStore.movies.length > 0">
        <div class="row justify-between items-center q-mb-xl">
          <div class="flex justify-start items-center">
            <span :class="headingClass" class="text-white q-mr-md">{{ $t('myMovies') }}</span>
            <img @click="toAddMovie" class="cursor-pointer" src="/images/add.png" alt="add" :width="imageWidth"
              :height="imageHeight">
          </div>
          <div @click.stop="logout" class="flex justify-start items-center cursor-pointer">
            <span :class="logoutText" class="body-regular text-white q-mr-md">{{ $t('logout') }}</span>
            <img src="/images/logout.png" alt="logout" :width="imageWidth" :height="imageHeight">
          </div>
        </div>

        <div class="row justify-center q-gutter-lg">
          <card-component v-for="movie in movieStore.movies" :key="movie.id" :movie="movie" @edit-movie="toEditMovie" />
        </div>

        <div class="pagination-controls q-mt-xl q-pt-xl">
          <q-btn flat @click="changePage(movieStore.currentPage - 1)" no-caps :label="$t('prev')" color="white"
            :disable="!movieStore.prevPageUrl" />

          <q-btn v-for="page in totalPages" :key="page" @click="changePage(page)" :label="page"
            :color="page === movieStore.currentPage ? 'primary' : 'white'" :flat="page !== movieStore.currentPage"
            class="page-btn q-ml-sm q-mr-sm" />

          <q-btn flat @click="changePage(movieStore.currentPage + 1)" no-caps :label="$t('next')" color="white"
            :disable="!movieStore.nextPageUrl" />
        </div>
      </div>
      <div v-else>
        <q-col cols="12" lg="8" class="movie-container">
          <div :class="headingClass" class="text-white mb-3 q-mb-xl text-center">{{ $t('emptyMovie') }}</div>

          <div class="flex flex-center">
            <q-btn @click="toAddMovie" :label="$t('addMovieButton')" type="button" no-caps color="primary"
              :class="buttonClass" class="body-regular" />
          </div>
        </q-col>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { useMovieStore } from 'src/stores/movie-store';
import { computed } from 'vue';
import CardComponent from 'src/components/CardComponent.vue';

export default {
  name: 'MoviesPage',
  components: {
    CardComponent
  },
  data() {
    return {
      loading: false,
    }
  },
  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const movieStore = useMovieStore();

    const headingClass = $q.screen.lt.md ? 'heading-three' : 'heading-two';
    const logoutText = $q.screen.lt.md && 'hidden';
    const buttonClass = $q.screen.lt.md && 'full-width';
    const imageWidth = $q.screen.lt.md ? '24' : '32';
    const imageHeight = $q.screen.lt.md ? '24' : '32';

    const totalPages = computed(() => {
      if (!movieStore.total || !movieStore.perPage) return 0;
      return Math.ceil(movieStore.total / movieStore.perPage);
    });

    return {
      $q,
      authStore,
      movieStore,
      headingClass,
      logoutText,
      buttonClass,
      imageWidth,
      imageHeight,
      totalPages
    }
  },
  methods: {
    async fetchMovies(page = 1) {
      this.loading = true;

      try {
        const token = this.authStore.user?.token;
        const response = await this.$api.get(`/movies?page=${page}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        this.movieStore.storeMovies(response.data?.data);
        this.movieStore.setPaginationData({
          current_page: response.data?.current_page,
          last_page: response.data?.last_page,
          next_page_url: response.data?.next_page_url,
          prev_page_url: response.data?.prev_page_url,
          total: response.data?.total,
          per_page: response.data?.per_page
        });
      } catch (error: any) {
        this.authStore.clearAuth();

        this.$q.notify({
          color: 'negative',
          message: error?.response?.data?.message
        });

        this.$router.push({ name: 'login' });

        this.$nextTick(() => {
          window.location.reload();
        });
      } finally {
        this.loading = false;
      }
    },
    changePage(page: number) {
      this.fetchMovies(page);
    },
    toAddMovie() {
      this.$router.push({ name: 'add' });
    },
    toEditMovie(id: number) {
      this.$router.push({ name: 'edit', params: { id } });
    },
    logout() {
      this.authStore.clearAuth();
      this.$router.push({ name: 'login' });

      this.$nextTick(() => {
        window.location.reload();
      });
    }
  },
  mounted() {
    this.fetchMovies();
  }
}
</script>

<style lang="scss" scoped>
.movie-container {
  width: 50em;
}

.movie-card {
  background-color: $card;
  max-width: 280px;
  min-width: 265px;
}

.movie-card:hover {
  transition: all 0.3s ease-in-out;
  background-color: $hover-card;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}

.page-btn {
  min-width: 2.5rem;
  text-align: center;
}

.page-btn.q-btn--flat {
  background-color: $card;
}

.page-btn.q-btn--primary {
  background-color: $primary;
}
</style>