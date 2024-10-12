import { defineStore } from 'pinia';

interface MovieType {
  id: number;
  title: string;
  slug: string;
  poster: string;
  publishingYear: number;
  created_at: string;
  updated_at: string;
}

interface PaginationType {
  current_page: number;
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
  total: number;
  per_page: number;
}

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as MovieType[],
    currentPage: 1 as number,
    lastPage: null as number | null,
    nextPageUrl: null as string | null,
    prevPageUrl: null as string | null,
    total: 0 as number,
    perPage: 0 as number,
  }),
  actions: {
    storeMovies(movies: MovieType[]) {
      this.movies = movies;
    },
    setPaginationData(paginationData: PaginationType) {
      this.currentPage = paginationData.current_page;
      this.lastPage = paginationData.last_page;
      this.nextPageUrl = paginationData.next_page_url;
      this.prevPageUrl = paginationData.prev_page_url;
      this.total = paginationData.total;
      this.perPage = paginationData.per_page;
    },
  },
});
