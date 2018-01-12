<template>
	<div class="ibo-radio-group" role="radiogroup" @keydown="handleKeydown">
    	<slot></slot>
  	</div>
</template>

<script>
	const keyCode = Object.freeze({
	    LEFT: 37,
	    UP: 38,
	    RIGHT: 39,
	    DOWN: 40
	});
	export default {
		name:"lxmRadioGroup",
		componentName: 'lxmRadioGroup',
		props: {
			value: {},
      		textColor: String,
      		disabled: Boolean
		},
		methods:{
			handleKeydown(e) { // 左右上下按键 可以在radio组内切换不同选项
		        const target = e.target;
		        const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]';
		        const radios = this.$el.querySelectorAll(className);
		        const length = radios.length;
		        const index = [].indexOf.call(radios, target);
		        const roleRadios = this.$el.querySelectorAll('[role=radio]');
	        	switch(e.keyCode) {
		        	case keyCode.LEFT:
		        	case keyCode.UP:
		        		e.stopPropagation();
		        		e.preventDefault();
		        		if(index === 0) {
		        			roleRadios[length - 1].click();
		        		} else {
		        			roleRadios[index - 1].click();
		        		}
		        		break;
		        	case keyCode.RIGHT:
		        	case keyCode.DOWN:
		        		if(index === (length - 1)) {
		        			e.stopPropagation();
		        			e.preventDefault();
		        			roleRadios[0].click();
		        		} else {
		        			roleRadios[index + 1].click();
		        		}
		        		break;
		        	default:
		        		break;
	        	}
	        }
        }
    }
</script>

<style scoped>
	.ibo-radio-group {
		display: inline-block;
		line-height: 1;
		vertical-align: middle;
	}
</style>