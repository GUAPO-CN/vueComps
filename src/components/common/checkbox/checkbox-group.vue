<template>
	<div class="ibo-checkbox-group" role="group" aria-label="checkbox-group">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:"lxmCheckboxGroup",
		componentName: 'lxmCheckboxGroup',
		props: {
			value: {},
			disabled: Boolean,
			min: Number,
      		max: Number,
		},
	} 
</script>

<style scoped>
	.ibo-checkbox-group .ibo-checkbox {
		font-size: 16px;
	}
	
	.ibo-checkbox-group {
		font-size: 0;
	}
</style>