<template>
  <div class="column items-center">
    <p class="heading-one">{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment" class="cursor-pointer">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
    <q-btn class="q-mt-xl" color="blue" text-color="white" unelevated to="/movie/login" label="Sign In" no-caps />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Todo, Meta } from './models';

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  todos: () => []
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);
</script>
