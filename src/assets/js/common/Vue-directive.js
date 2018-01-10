import Vue from 'vue'

let lxm_directivce = {};
lxm_directivce.install = Vue =>{
	Vue.directive('inputNumberOnly',{  //只能输入 正数
		bind:function(el){
			el.handler =function(){
				//console.log(el.value,'el 是什么')
				el.value = el.value.replace(/\D+/,'');
			}
			el.addEventListener('input',el.handler);
		},
		update:function(){
			
		},
		unbind:function(el){
			el.removeEventListener('input',el.handler);
		},
	})
		
	
}

export default lxm_directivce;