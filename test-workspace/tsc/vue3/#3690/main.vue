<script>
import { defineComponent } from 'vue';
import Comp from './Comp.vue';

export default defineComponent({
	components: { Comp },
	props: {
		ppp: {
			type: String,
		}
	},
});
</script>

<template>
	<Comp />
</template>
