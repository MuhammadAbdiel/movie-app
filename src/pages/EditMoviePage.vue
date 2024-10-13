<template>
  <q-page class="row full-width q-px-xl q-py-xl">
    <div class="col">
      <span :class="headingClass" class="text-white q-mr-md">{{ $t('edit') }}</span>

      <div v-if="$q.screen.lt.md">
        <q-form @submit="onUpdate" @reset="onReset" ref="form" class="q-mt-md q-pt-md text-white">
          <input-component :label="$t('title')" v-model="form.title" :rules="[validateTitle]" :type="'text'" />

          <input-component :label="$t('publishingYear')" v-model="form.publishingYear" :rules="[validatePublishingYear]"
            :type="'number'" />

          <q-file :rules="[validatePoster]" class="file-uploader cursor-pointer" v-model="form.poster" fill
            :label="$t('dropOtherImage')" label-color="white" square borderless dark use-chips>
            <template v-slot:append>
              <q-icon name="download" size="md" class="text-white" />
            </template>
          </q-file>

          <div class="row q-gutter-md q-pt-xl">
            <button-component @click="navigateToMoviesPage" :type="'button'" :color="'transparent'"
              :class="'col q-px-xl q-py-md cancel-button'" :label="$t('cancel')" />
            <button-component :class="'col q-px-xl q-py-md'" :loading="loading" :label="$t('update')" />
          </div>
        </q-form>
      </div>
      <div v-else>
        <q-form @submit="onUpdate" @reset="onReset" ref="form" class="row q-gutter-xl q-mt-md q-pt-md text-white">
          <div class="col-md-4 q-mr-xl">
            <q-file :rules="[validatePoster]" class="file-uploader cursor-pointer" v-model="form.poster" fill
              :label="$t('dropOtherImage')" label-color="white" square borderless dark use-chips>
              <template v-slot:append>
                <q-icon name="download" size="md" class="text-white" />
              </template>
            </q-file>
          </div>
          <div class="col-6">
            <input-component :label="$t('title')" v-model="form.title" :rules="[validateTitle]" :type="'text'" />

            <input-component :label="$t('publishingYear')" v-model="form.publishingYear"
              :rules="[validatePublishingYear]" :type="'number'" />

            <div class="flex q-gutter-md q-pt-xl">
              <button-component @click="navigateToMoviesPage" :type="'button'" :color="'transparent'"
                :class="'col q-px-xl q-py-md cancel-button'" :label="$t('cancel')" />
              <button-component :class="'col q-px-xl q-py-md'" :loading="loading" :label="$t('update')" />
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { useMovieStore } from 'src/stores/movie-store';
import { useI18n } from 'vue-i18n';
import ButtonComponent from '../components/ButtonComponent.vue';
import InputComponent from 'src/components/InputComponent.vue';

export default {
  name: 'EditMoviePage',
  components: {
    ButtonComponent,
    InputComponent
  },
  data() {
    return {
      form: {
        poster: null as File | null,
        title: '',
        publishingYear: ''
      },
      loading: false,
      loadingMovie: false,
    };
  },
  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const movieStore = useMovieStore();
    const { t } = useI18n();

    const headingClass = $q.screen.lt.md ? 'heading-three' : 'heading-two';

    return {
      $q,
      headingClass,
      authStore,
      movieStore,
      t,
    }
  },
  methods: {
    validatePoster(val: File) {
      if (val) {
        if (!val.type.includes('image')) {
          return this.t('posterValidation');
        }
      }

      return true;
    },
    validateTitle(val: string) {
      if (val.length < 5) {
        return this.t('titleValidation');
      }

      return true;
    },
    validatePublishingYear(val: string) {
      if (val.length < 4) {
        return this.t('publishingYearValidation');
      }

      return true;
    },
    async fetchMovie() {
      this.loadingMovie = true;

      try {
        const token = this.authStore.user?.token;
        const movieId = this.$route.params.id;
        const response = await this.$api.get(`/movies/${movieId}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        this.form.title = response.data.data.title;
        this.form.publishingYear = response.data.data.publishingYear;
      } catch (error: any) {
        this.$q.notify({
          color: 'negative',
          message: error?.response?.data?.message
        });
      } finally {
        this.loadingMovie = false;
      }
    },
    async onUpdate() {
      const form = this.$refs.form as unknown as { validate: () => boolean };
      if (form.validate()) {
        this.loading = true;

        const slug = this.form.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        try {
          const formData = new FormData();

          formData.append('_method', 'PUT');

          if (this.form.poster) {
            formData.append('poster', this.form.poster as any);
          }

          formData.append('title', this.form.title);
          formData.append('slug', slug);
          formData.append('publishingYear', this.form.publishingYear);

          const token = this.authStore.user?.token;
          const movieId = this.$route.params.id;
          const response = await this.$api.post(`/movies/${movieId}`, formData, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          this.$q.notify({
            color: 'positive',
            message: response.data.message
          });

          this.$router.push({ name: 'movies' });
        } catch (error: any) {
          console.log(error)
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
        poster: null,
        title: '',
        publishingYear: ''
      };
    },
    navigateToMoviesPage() {
      this.$router.push({ name: 'movies' });
    }
  },
  mounted() {
    this.fetchMovie();
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

.input {
  background-color: $input;
  border-radius: 10px;
}

.cancel-button {
  border: 2px solid white;
}

.file-uploader {
  @media screen and (max-width: 768px) {
    height: 300px;
  }

  height: 450px;
  border: 2px dashed white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $input;
  color: white;
  border-radius: 10px;
  padding: 10px;

  .q-file__bottom {
    display: none;
  }

  .q-field__bottom {
    .q-field__messages {
      margin-top: 10px;
    }
  }

  .q-field__control {
    @media screen and (max-width: 768px) {
      margin-top: 60px;
    }

    width: 100%;
    height: 50%;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
  }
}
</style>