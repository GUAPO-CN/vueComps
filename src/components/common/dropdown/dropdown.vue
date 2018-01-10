<template>
	<div class="ibo-dropdown"  @blur="blurHide($event)" tabindex="-1" style="outline:none;">
		<div class="ibo-dropdown-menu" @click="showOrHide($event)"  :style="propstyle">
			<dropdownmenu :selectitemname='selectitemName' ></dropdownmenu>
			<i class="icon bb-iconfont icon-bb-triangle" ref='triangle'></i>
		</div>
		<ul class="ibo-dropdown-list" :style="listyle" ref='dropdownList'>
			<li v-for="(item,index) in droplist" :key='index' class="ibo-dropdown-list-li" ref='dropdownLi'>
				<dropdownlist :dropitem='item' :dropindex='index' @selectItem='selectItem' ref='thisLi'>{{item.label}}</dropdownlist>
			</li>
		</ul>
	</div>
</template>

<script>
	import dropdownmenu from './dropdown-menu'
	import dropdownlist from './dropdown-list'
	export default{
		name:'lxmDropdown',
		components: {
			dropdownlist,
			dropdownmenu,
		},
		data(){
			return {
				selectitemName:'' ,
				selectitemType:this.selectitemtype,
			}
		},
		props: {
			droplist: {
				type: Array,
				default: function() {
					return [];
				}
			},
			selectitemtype:String,
			propstyle: {},
			listyle:{},
		},
		methods:{
			toggleSlide(id,time,isblur){
				var div = this.$refs.dropdownList;
				var div_Height = div.offsetHeight;
				var lis_Length = this.$refs.dropdownLi.length;
				var lis_Height = this.$refs.dropdownLi[0].offsetHeight;
				var i_rotate = this.$refs.triangle;
				div.style.transition = 'height '+time+'ms';
				div.style.overflow = 'hidden';
				//console.log(div_Height)
				if(div_Height>10){
					div.style.height = 0;
					div.style.visibility = 'hidden';
					i_rotate.style.transform = 'rotate(180deg)';
				}else{
					if(!isblur){
						div.style.height = lis_Length*lis_Height+'px';
						div.style.visibility = 'visible';
						i_rotate.style.transform = 'rotate(360deg)';
					}
				}
			},
			selectItem(obj){
				//console.log(obj,'selectItem')		
				if(this.selectitemType!=obj.value){
					this.selectitemName = obj.showName ?  obj.showName : obj.label;
					this.selectitemType = obj.value;
					this.$emit('selectIemValue',obj.value);
				}
				this.toggleSlide('ibo-dropdown-list','500');
			},
			showOrHide(evt){
				//console.log(this.$refs,'this.$ref');
				this.toggleSlide('ibo-dropdown-list','500');
			},
			blurHide(evt){
				//console.log(evt)
				this.toggleSlide('ibo-dropdown-list','500',true);
			},
		},
		watch:{
			selectitemtype(val){
				//console.log(val,'watch val selectitemtype ')
				//console.log(this.selectitemtype,'this.selectitemtype ')
				if(val){
					this.selectitemType = val;
					this.selectitemName = this.droplist[val].showName ? this.droplist[val].showName : this.droplist[val].label;
				}else{
					this.selectitemName = this.droplist[0].showName ? this.droplist[0].showName : this.droplist[0].label;
				}
			}
		},
		created(){
			//console.log(this.droplist,'xxxxxxxxxxxx');
			if(this.selectitemtype){ 
				this.selectitemType = this.selectitemtype;
				this.selectitemName = this.droplist[this.selectitemtype].showName ? this.droplist[this.selectitemtype].showName : this.droplist[this.selectitemtype].label;
			}else{  //无 type 默认选 第一个 
				this.selectitemName = this.droplist[0].showName ? this.droplist[0].showName : this.droplist[0].label;
			}
		}
	}
</script>

<style scoped>
	
	.bb-iconfont {
	    font-family: "bbiconfont" !important;
	    font-size: 16px;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	}
	.icon-bb-triangle:before {
	    content: "\E615";
	}
	
	
	
	ul{
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	.ibo-dropdown{
		display: inline-block;
	    height: 26px;
	    position: absolute;
	    cursor: pointer;
	}
	.ibo-dropdown-menu{
		display: inline-block;
	    width: 92px;
	    height: 26px;
	    line-height: 26px;
	    background: #42A4FF;
	    color: #FFFFFF;
	    font-size: 14px;
	    padding:0 10px;
	    overflow: hidden;
	}
	.ibo-dropdown-menu:hover{
	    background: #4db3ff;
	    border-color: #4db3ff;
	    color: #fff;
	}
	.ibo-dropdown-menu .icon-bb-triangle{
		margin-left: 10px;
		position: absolute;
		top: 0;
		right: 10px;
		filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
	    -moz-transform: rotate(180deg);
	    -o-transform: rotate(180deg);
	    -webkit-transform: rotate(180deg);
	    transform: rotate(180deg);
        -webkit-transition: All 0.5s ease-in-out;
	    transition: All 0.5s ease-in-out;
	    -webkit-transition: All 0.4s ease-in-out;
	    -moz-transition: All 0.4s ease-in-out;
	    -o-transition: All 0.4s ease-in-out;
	}
	.ibo-dropdown-list{
	    position: absolute;
	    top: 26px;
	    left: 0;
	    z-index: 999;
	    width: 110px;
	    background: #FFFFFF;
        box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.12);
    	border: 1px solid #d1dbe5;
    	visibility: hidden;
    	height: 0px;
	}
	.ibo-dropdown-list-li{
		padding: 0 10px;
		height: 26px;
		line-height: 26px;
		font-size: 14px;
	}
	.ibo-dropdown-list-li:hover{
	    background-color: #e4e8f1;
    	color: #48576a;
	}
</style>