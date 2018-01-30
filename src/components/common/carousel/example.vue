<template>
	<div style="position: relative;">
    	<div style="width: 300px;text-align: center;display: inline-block;left: 800px;position: absolute;" >
	    	<lxm-carousel trigger="click" height="150px" :autoplay='isauto' @change='changeIndex' :initial-index='thisindex'>
		      	<lxm-carousel-item v-for="item in 10" :key="item" :label='haslabel'>
		        	<img 
			      	src="http://test.bounb.com/CompanyBaseService/UploadFile//20180110170248846zmzW_425768_22222.gif" 
			      	alt="">
		      	</lxm-carousel-item>
	    	</lxm-carousel>
    	</div>
		<!--<div style="width: 400px;text-align: center;">
		   	<el-carousel trigger="click" height="150px" :autoplay='isauto'>
		      	<el-carousel-item v-for="item in 4" :key="item" :label='haslabel'>
		        	<img 
			      	data-v-8b623596="" 
			      	data-v-65c0ff31="" 
			      	src="http://test.bounb.com/CompanyBaseService/UploadFile//20180110170248846zmzW_425768_22222.gif" 
			      	alt="">
		      	</el-carousel-item>
	    	</el-carousel>
    	</div>-->
	</div>
</template>

<script>
	export default {
		name:'carousel',
		data(){
			return {
				isauto:false,
				haslabel:'333',
				thisindex:5
			}
		},
		methods:{
			changeIndex(val,oldval){
//				console.log(oldval,'old val ')
//				console.log(val,'new val ');
			}
		}
	}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>