<template>
	<div>
		<lxm-checkbox :indeterminate="isIndeterminate" v-model='checkAll' @change='changeAll'>全选</lxm-checkbox>
		<hr />
		<lxm-checkbox-group v-model='checkedVal' :max='5' :min='2'  @change='changeGroup'>
			<lxm-checkbox key='2' label='b' :checked='true' border>www</lxm-checkbox>
			<lxm-checkbox key='1' label='a' disabled border>禁用</lxm-checkbox>
			<lxm-checkbox key='4' label='d' border>ddd</lxm-checkbox>
			<lxm-checkbox key='3' label='c' boxCheckedColor='#F65858' box_borderCheckedColor='#F65858'>zzz</lxm-checkbox>
			<lxm-checkbox key='5' :label='e' @change='changE' >eee</lxm-checkbox>
			<lxm-checkbox key='6' label='f'>fff</lxm-checkbox>
		</lxm-checkbox-group>
		{{checkedVal}}
		<hr/>
		<hr/>
		<lxm-checkbox v-model='checkedVal1' label='true'>单选</lxm-checkbox>
		<hr/>
		<hr />
		<lxm-checkbox-group v-model='checkedVal2' @change='changeGroup'>
			<lxm-checkbox-button label='1' checked>xxx</lxm-checkbox-button>
			<lxm-checkbox-button label='2' @change='changE'>333</lxm-checkbox-button>
			<lxm-checkbox-button label='3' disabled>5555</lxm-checkbox-button>
			<lxm-checkbox-button label='4' >6666</lxm-checkbox-button>
		</lxm-checkbox-group>
		{{checkedVal2}}
	</div>
</template>

<script>
	export default {
		name: 'checkbox',
		data() {
			return {
				//多选
				checkAll:false,
				isIndeterminate: true,
				checkedVal: ['a'],
				checkedVal2: [],
				checkedVal1:true,
				e:'e',
			}
		},
		methods: {
			//多选 回调
			changE(val,evt){
				console.log('changE val --> app .vue ',val)
				console.log('changE evt --> app .vue ',evt)
			},
			changeGroup(val){
				console.log('changeGroup val -->  app .vue ',val)
				let checkLen = val.length;
				this.checkAll = checkLen === 6;
				this.isIndeterminate = checkLen > 0 && checkLen < 6;
			},
			changeAll(val){
				console.log('changeAll val -->  app .vue ',val)
				if(val){
					this.checkedVal=['a','b','c','d','e','f'];
				}else{
					this.checkedVal=[];
				}
				this.isIndeterminate = false;
			},
		}
	}
</script>

<style>
</style>