<template>

</template>

<script setup lang="ts">
import type { VNode } from 'vue'

defineSlots<{
	default: (props: { num: number }) => VNode[],
	'named-slot': (props: { str: string }) => VNode[],
	vbind: (props: { num: number, str: string }) => VNode[],
	'no-bind': () => VNode[],
}>()
</script>
