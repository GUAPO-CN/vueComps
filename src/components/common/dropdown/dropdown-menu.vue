<template>
	<div class="ibo-dropdown-menu-inner" :class="styleClass">
		<slot v-if='!selectitemname'></slot>
		<div v-if='selectitemname'>{{selectitemname}}</div>
	</div>
</template>

<script>
	export default {
		name :'iboDorpdownMenu',
		data(){
			return{
				
			}
		},
		props:{
			styleClass:[String,Array],
			selectitemname:String,
		},
		methods:{
			
		},
		watch:{
			selectitemname(val){
				//console.log(val,'selectitemname menu')
			}
		},
	}
</script>

<style scoped="scoped">
	.ibo-dropdown-menu-inner{
		position: relative;
		padding-right: 16px;
		text-align: center;
	}
</style>