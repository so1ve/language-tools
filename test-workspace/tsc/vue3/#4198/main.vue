<script setup lang="ts">
import { ref } from 'vue';
import child from './child.vue';

const msg = ref('');
</script>

<template>
  <child @vnode-before-mount=""
    v-bind="{
      onBark: ($event) => { msg = $event }
    }"
  />
</template>
