<template>
  <div id="app">
    <lxm-dropdown :selectitemtype='selectType2' :droplist='selectbox2' @selectIemValue='selectFunc2' style='left: 100px;' ></lxm-dropdown>
    <div>选中： {{selectType2}}</div>
    <br />
    <input type="text" name="inputText" id="inputText" value="" v-input-number-only />
  </div>
</template>

<script>

export default {
  name: 'app',
	data() {
			return {
				selectType2: '0', //下拉选中项 的 key
				selectbox2: [     //下拉选项 数组
					{
						value: '0',  //选项 的 key
						label: '不限',   //选项 的 字
						showName : '平台认证',  //头部 显示的 字
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
			}
	},
	methods:{
		selectFunc2(val){    //下拉选择 回调
			this.selectType2 = val;
		}
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
