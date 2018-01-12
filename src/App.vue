<template>
	<div id="app">
		<!--<lxm-dropdown :selectitemtype='selectType2' :droplist='selectbox2' @selectIemValue='selectFunc2' style='left: 100px;'></lxm-dropdown>
		<div>选中： {{selectType2}}</div>
		<hr/>
		<input type="text" placeholder="指令限制只能输正整数" name="inputText" id="inputText" value="" v-input-number-only />
		<hr/>
		<hr/>
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
		<hr/>-->
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
		name: 'app',
		data() {
			return {
				//下拉 选择
				selectType2: '0', //下拉选中项 的 key
				selectbox2: [ //下拉选项 数组
					{
						value: '0', //选项 的 key
						label: '不限', //选项 的 字
						showName: '平台认证', //头部 显示的 字
					},
					{
						value: '1',
						label: '已认证',
					},
					{
						value: '2',
						label: '未认证',
					}
				],
		
				//多选
				checkAll:false,
				isIndeterminate: true,
				checkedVal: ['a'],
				checkedVal2: [],
				checkedVal1:true,
				e:'e',
				
				//单选
				radio:'1',
				radio2:'1',
				radio3:'1',
			}
		},
		methods: {
			//下拉选择 回调
			selectFunc2(val) {
				this.selectType2 = val;
			},
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
			//单选 回调
			changeRadio(val){
				console.log('changeRadio val -->  app .vue ',val)
			}
		},
		watch: {
		},
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>