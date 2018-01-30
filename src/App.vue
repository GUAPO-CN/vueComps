<template>
	<div id="app">
		<input type="text" placeholder="指令限制只能输正整数" name="inputText" id="inputText" value="" v-input-number-only />
		
		
		<!--<lxm-row type="flex" class="row-bg" align="top">
		  <lxm-col :span="6"><div class="grid-content bg-purple">使用方法跟element-ui的 row col一样</div></lxm-col>
		  <lxm-col :span="6"><div class="grid-content bg-purple-light"></div></lxm-col>
		  <lxm-col :span="6"><div class="grid-content bg-purple"></div></lxm-col>
		</lxm-row>-->
		<lxm-breadcrumb separator=">">
		  <lxm-breadcrumb-item :to="{ path: '/' }">首页</lxm-breadcrumb-item>
		  <lxm-breadcrumb-item :to="{ path:'/table' }">table</lxm-breadcrumb-item>
		  <lxm-breadcrumb-item :to="{ path:'/dropdown' }">dropdown</lxm-breadcrumb-item>
		  <lxm-breadcrumb-item :to="{ path:'/checkbox' }">checkbox</lxm-breadcrumb-item>
		  <lxm-breadcrumb-item :to="{ path:'/radio' }">radio</lxm-breadcrumb-item>
		  <lxm-breadcrumb-item :to="{ path:'/form' }">form</lxm-breadcrumb-item>
		  <lxm-breadcrumb-item :to="{ path:'/carousel' }">carousel</lxm-breadcrumb-item>
		  <lxm-breadcrumb-item >首页</lxm-breadcrumb-item>
		</lxm-breadcrumb>
		<router-view></router-view>
	</div>
</template>

<script>
	import exampleTable from './components/common/table/elTableExample'
	export default {
		name: 'app',
		components:{
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		watch: {
		},
	}
</script>

<style>
	@import './assets/css/index.css';
	@import './assets/font/download/iconfont.css';
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	  .el-bg {
	    padding: 10px 0;
	    background-color: #f9fafc;
  	  }
	  .el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  .el-col {
	    border-radius: 4px;
	  }
	  .bg-purple-dark {
	    background: #99a9bf;
	  }
	  .bg-purple {
	    background: #d3dce6;
	  }
	  .bg-purple-light {
	    background: #e5e9f2;
	  }
	  .grid-content {
	    border-radius: 4px;
	    min-height: 36px;
	  }
</style>