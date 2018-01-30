<template>
	<div>
		<lxm-radio label='1' v-model='radio' @change='changeRadio'>选项1 </lxm-radio>
		<lxm-radio label='2' v-model='radio' disabled  @change='changeRadio'>选项2 </lxm-radio>
		<lxm-radio label='3' v-model='radio' @change='changeRadio'>选项3 </lxm-radio>
		<lxm-radio label='4' v-model='radio' @change='changeRadio'>选项4 </lxm-radio>
		<hr />
		<lxm-radio-group v-model='radio2' @change='changeRadio'>
			<lxm-radio label='1'  disabled border>选项1 </lxm-radio>
			<lxm-radio label='2'  border>选项2 </lxm-radio>
			<lxm-radio label='3' >选项3 </lxm-radio>
			<lxm-radio label='4' >选项4 </lxm-radio>
		</lxm-radio-group>
		<hr />
		<lxm-radio-group v-model='radio3' @change='changeRadio'>
			<lxm-radio-button label='1' disabled border>选项1 </lxm-radio-button>
			<lxm-radio-button label='2' border>选项2 </lxm-radio-button>
			<lxm-radio-button label='3' >选项3 </lxm-radio-button>
			<lxm-radio-button label='4' >选项4 </lxm-radio-button>
		</lxm-radio-group>
	</div>
</template>

<script>
	export default {
		name: 'radio',
		data() {
			return {
				//单选
				radio:'1',
				radio2:'1',
				radio3:'1',
			}
		},
		methods: {
			//单选 回调
			changeRadio(val){
				console.log('changeRadio val -->  app .vue ',val)
			}
		}
	}
</script>

<style>
</style>