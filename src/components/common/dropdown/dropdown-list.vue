<template>
	<div class="ibo-dropdown-list-inner" :class="styleClass" @click="listClick">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name :'iboDorpdownList',
		data(){
			return{
				
			}
		},
		props: {
			styleClass:[String,Array],
			dropitem: {
				type: Object,
				default: function() {
					return {};
				}
			},
		},
		methods:{
			listClick(){
				//console.log(this.dropitem,'listClick')
				this.$emit('selectItem',this.dropitem);
			}
		},
		watch:{
			dropitem(val){
				//console.log(val,'watch')
			}
		},
	}
</script>

<style scoped="scoped">
	.ibo-dropdown-list-inner{
		
	}
</style>