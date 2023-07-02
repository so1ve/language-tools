<script setup lang="ts">
const a = [1];
</script>

<template>
	<template v-for="(_, i) in a" :key="i"></template>
</template>
