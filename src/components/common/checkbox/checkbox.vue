<template>
	<label class="ibo-checkbox"
		:class="{
    		'is-disabled': isDisabled,
        	'is-checked': isChecked,
        	'is-bordered':border,
      	}"
      	role="checkbox"
      	:aria-checked="indeterminate ? 'mixed': isChecked"
		:aria-disabled="isDisabled"
		:id="id"
		>
		<span class="ibo-checkbox__input"
			:class="{
        		'is-disabled': isDisabled,
	        	'is-checked': isChecked,
	        	'is-indeterminate': indeterminate,
	      	}"
	      	aria-checked="mixed"
			>
			<span class="ibo-checkbox__inner"
				:class="{
	        		'is-disabled': isDisabled,
		        	'is-checked': isChecked,
		      	}"
		  		:style="{
				  	backgroundColor:isChecked ? boxCheckedColor:'',
				  	borderColor:isChecked ? box_borderCheckedColor:'',
			  	}"></span>
			<input
		        class="ibo-checkbox__original"
		        type="checkbox"
		        :value="label"
		        :name="name"
		        :disabled= "isDisabled" 
		        v-model="checkedModel"
		        @change="handleChange"
		        >
		</span>
		<span 
			class="ibo-checkbox__label" 
			v-if="$slots.default || label"
			:style="{
			  	color:isChecked ? boxCheckedColor:'',
		  	}"
			>
	      <slot></slot>
	      <template v-if="!$slots.default">{{label}}</template>
	    </span>
	</label>
</template>

<script>
	export default {
		name:"lxmCheckbox",
		componentName: 'lxmCheckbox',
		data() {
	      	return {
		        selfModel: false,
		        focus: false,
		        isLimitExceeded: false
	      	};
	    },
		props: {
			value: {},
			label: {},
			name: String,
			disabled: Boolean,
			checked: Boolean,
			border: Boolean,
			indeterminate: Boolean, //全选 的半 选中 状态
			id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
			controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
			boxCheckedColor:{	//选中状态背景颜色
				default:"#20a0ff"
			},
			box_borderCheckedColor:{//选中状态边框颜色
				default:"#0190fe"
			}
		},
		computed: {
			checkedModel:{
				get(){
					//console.log('2 get parentValue');
					return this.isGroup ? this.parentValue : this.value;//访问父级组件中v-model值，如果没有观察props中的
				},
				set(val){
					this.isLimitExceeded = false;
					//console.log(val,'set val v-model语法糖 input 类型为 checkbox 时 监测到string 转为boolean，监测到数组时 进行push' )
					if(this.isGroup){
						let isLimitExceeded = false;
						if((this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min) || (this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max)) {
							isLimitExceeded = true;
						} else {
							//console.log(this._checkboxGroup.value,'父组件里的value')
							this._checkboxGroup.$emit.apply(this._checkboxGroup, ['input'].concat([val]));
							//参考：https://www.cnblogs.com/xxcanghai/p/6382607.html
							//this._checkboxGroup.$emit("input", val);
						}
					}else{
						this.$emit("input", val);
					}
				}
			},
			isGroup(){
				//console.log('3 isGroup')
				let parent = this.$parent;
				while(parent){   //一直往上找 parent 
					if(parent.$options.componentName !== 'lxmCheckboxGroup') {
						parent = parent.$parent;
					} else {
						this._checkboxGroup = parent;
						return true;
					}
				}
				return false;
			},
			parentValue(){
				//console.log('4 parentValue',this._checkboxGroup.value)
				return this._checkboxGroup ? this._checkboxGroup.value : this.value;
			},
			isChecked() {
				//console.log('1 isChecked   ---->' )
				if({}.toString.call(this.checkedModel) === '[object Boolean]') {
					return this.checkedModel; //单例应用
				} else if(Array.isArray(this.checkedModel)) {
					return this.checkedModel.indexOf(this.label) > -1;
				} else if(this.checkedModel !== null && this.checkedModel !== undefined) {
					return this.checkedModel === this.trueLabel;
				}
			},
			isDisabled() {
		        return this.isGroup? this._checkboxGroup.disabled || this.disabled: this.disabled;
		    },
		}, 
		watch:{
		},
		methods: {
			addToStore(){
				if (Array.isArray(this.checkedModel) &&this.checkedModel.indexOf(this.label) === -1) {
          			this.checkedModel.push(this.label);
        		} else {
          			this.checkedModel = true;
    			}
			},
			handleChange(ev){
				if (this.isLimitExceeded) return;
				var isGroup = this.isGroup;
       	 		let value;
				if (ev.target.checked){
		          	value =  true ;
		        } else {
		          	value =  false;
		        }
		        this.$emit('change', value, ev);
		        this.$nextTick(() => {
		          	if(isGroup) {
		          		this._checkboxGroup.$emit('change', this._checkboxGroup.value);
		          	} 
		        });
			},
		},
		created() {
	      	this.checked && this.addToStore();
	    },
	    mounted() { // 为indeterminate元素 添加aria-controls 属性
	      	if (this.indeterminate) {
	        	this.$el.setAttribute('aria-controls', this.controls);
	      	}
	    },
	} 
</script>

<style scoped>
	.ibo-checkbox {
		color: #1f2d3d;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
	.ibo-checkbox.is-bordered {
	    padding: 9px 20px 9px 10px;
	    border-radius: 4px;
	    border: 1px solid #dcdfe6;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    line-height: normal;
	    height: 40px;
	}
	.ibo-checkbox__input.is-checked+.ibo-checkbox__label {
	    color: #409EFF;
	}
	.ibo-checkbox__input.is-disabled+.ibo-checkbox__label {
	    color: #ebeef5 !important;
	}
	.ibo-checkbox.is-bordered.is-checked {
	    border-color: #409EFF;
	}
	.ibo-checkbox.is-bordered.is-disabled {
	    border-color: #ebeef5 !important;
	    cursor: not-allowed;
	}
	.ibo-checkbox.is-disabled.is-checked {
		cursor: not-allowed;
	    cursor: -ms-not-allowed;
	}
	.ibo-checkbox,
	.ibo-checkbox__input {
		cursor: pointer;
		display: inline-block;
		position: relative;
		white-space: nowrap;
	}
	
	.ibo-checkbox__input {
		outline: 0;
		line-height: 1;
		vertical-align: middle;
	}
	
	.ibo-checkbox__original {
		opacity: 0;
		outline: 0;
		position: absolute;
		margin: 0;
		width: 0;
		height: 0;
		left: -999px;
	}
	
	.ibo-checkbox__input.is-checked .ibo-checkbox__inner ,.ibo-checkbox__input.is-indeterminate .ibo-checkbox__inner{
		background-color: #20a0ff;
		border-color: #0190fe;
	}
	.ibo-checkbox__input.is-disabled.is-checked .ibo-checkbox__inner {
	    background-color: #f2f6fc !important;
	    border-color: #dcdfe6 !important;
	    cursor: not-allowed;
	    cursor: -ms-not-allowed;
	}
	.ibo-checkbox__input.is-indeterminate .ibo-checkbox__inner::before {
	    content: '';
	    position: absolute;
	    display: block;
	    background-color: #fff;
	    height: 4px;
	    -webkit-transform: scale(.5);
	    transform: scale(.5);
	    left: 0;
	    right: 0;
	    top: 5px;
	}
	.ibo-checkbox__inner {
		display: inline-block;
		position: relative;
		border: 1px solid #bfcbd9;
		border-radius: 4px;
		box-sizing: border-box;
		width: 16px;
		height: 16px;
		background-color: #fff;
		z-index: 1;
		transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
	}
	
	.ibo-checkbox__input.is-checked .ibo-checkbox__inner::after {
		-ms-transform: rotate(45deg) scaleY(1);
		transform: rotate(45deg) scaleY(1);
	}
	.ibo-checkbox__inner::after {
		box-sizing: content-box;
		content: "";
		border: 2px solid #fff;
		border-left: 0;
		border-top: 0;
		height: 7.5px;
		left: 4px;
		position: absolute;
		top: 1px;
		-ms-transform: rotate(45deg) scaleY(0);
		transform: rotate(45deg) scaleY(0);
		width: 4px;
		transition: transform .15s cubic-bezier(.71, -.46, .88, .6) .05s;
		-ms-transform-origin: center;
		transform-origin: center;
	}
	
	.ibo-checkbox__label {
		font-size: 16px;
		padding-left: 5px;
	    line-height: 16px;
	}
	
	.ibo-checkbox+.ibo-checkbox {
		margin-left: 15px;
	}
	
	.ibo-checkbox-group .ibo-checkbox {
		font-size: 16px;
	}
	
	.ibo-checkbox-group {
		font-size: 0;
	}
</style>