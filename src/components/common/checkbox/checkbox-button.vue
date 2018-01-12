<template>
	<label class="ibo-checkbox-button"
		:class="{
    		'is-disabled': isDisabled,
        	'is-checked': isChecked,
      	}"
		:aria-disabled="isDisabled"
		:id="id"
		>
		<input
	        class="ibo-checkbox-button__original"
	        type="checkbox"
	        :value="label"
	        :name="name"
	        :disabled= "isDisabled" 
	        v-model="checkedModel"
	        @change="handleChange"
	        >
		<span class="ibo-checkbox-button__inner"
			v-if="$slots.default || label"
			:style="isChecked ? activeStyle : null"
			>
	      	<slot>{{label}}</slot>
	    </span>
	</label>
</template>

<script>
	export default {
		name:"lxmCheckboxButton",
		componentName: 'lxmCheckboxButton',
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
		    activeStyle() {
		        return {
		          	backgroundColor: this._checkboxGroup.fill || '',
		          	borderColor: this._checkboxGroup.fill || '',
		          	color: this._checkboxGroup.textColor || '',
		          	'box-shadow': '-1px 0 0 0 ' + this._checkboxGroup.fill
		        };
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
				if (ev.target.checked) {
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
	} 
</script>

<style scoped>
	.ibo-checkbox-button__original {
	    opacity: 0;
	    outline: 0;
	    position: absolute;
	    margin: 0;
	    left: -999px;
	}
	.ibo-checkbox-button:first-child .ibo-checkbox-button__inner {
	    border-left: 1px solid #dcdfe6;
	    border-radius: 4px 0 0 4px;
	    -webkit-box-shadow: none!important;
	    box-shadow: none!important;
	}
	.ibo-checkbox-button:last-child .ibo-checkbox-button__inner {
    	border-radius: 0 4px 4px 0;
	}
	.ibo-checkbox-button.is-checked .ibo-checkbox-button__inner {
	    color: #fff;
	    background-color: #409EFF;
	    border-color: #409EFF;
	    -webkit-box-shadow: -1px 0 0 0 #8cc5ff;
	    box-shadow: -1px 0 0 0 #8cc5ff;
	}
	.ibo-checkbox-button.is-disabled .ibo-checkbox-button__inner {
	    color: #c0c4cc;
	    cursor: not-allowed;
	    background-image: none;
	    background-color: #fff;
	    border-color: #ebeef5;
	    -webkit-box-shadow: none;
	    box-shadow: none;
	}
	.ibo-checkbox-button__inner {
	    line-height: 1;
	    font-weight: 500;
	    white-space: nowrap;
	    vertical-align: middle;
	    cursor: pointer;
	    background: #fff;
	    border: 1px solid #dcdfe6;
	    border-left: 0;
	    color: #606266;
	    -webkit-appearance: none;
	    text-align: center;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    outline: 0;
	    margin: 0;
	    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
	    transition: all .3s cubic-bezier(.645,.045,.355,1);
	    -moz-user-select: none;
	    -webkit-user-select: none;
	    -ms-user-select: none;
	    padding: 12px 20px;
	    font-size: 14px;
	    border-radius: 0;
	}
	.ibo-checkbox-button, .ibo-checkbox-button__inner {
	    position: relative;
	    display: inline-block;
	}
	.ibo-checkbox-group {
	    font-size: 0;
	}	
</style>