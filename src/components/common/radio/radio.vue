<template>
	<label class="ibo-radio" 
		:class="[
	      	{ 'is-disabled': isDisabled },
	      	{ 'is-bordered': border },
	      	{ 'is-checked': model === label }
	    ]" 
    	role="radio" 
    	:aria-checked="model === label" 
    	:aria-disabled="isDisabled" 
    	@keydown.space.stop.prevent="model = label"
    	>
    <span class="ibo-radio__input"
      	:class="{
        	'is-disabled': isDisabled,
        	'is-checked': model === label
      	}"
    >
    <span class="ibo-radio__inner"></span>
    <input
        class="ibo-radio__original"
        :value="label"
        type="radio"
        v-model="model"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
    >
    </span>
    <span class="ibo-radio__label">
      	<slot></slot>
     	<template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
	export default {
		name: 'lxmRadio',
		componentName: 'lxmRadio',
		props: {
			value: {},
			label: {},
			disabled: Boolean,
			name: String,
			border: Boolean,
		},
		data() {
			return {
        		focus: false
      		};
		},
		computed: {
			isGroup() {
				let parent = this.$parent;
				while(parent) {
					if(parent.$options.componentName !== 'lxmRadioGroup') {
						parent = parent.$parent;
					} else {
						this._radioGroup = parent;
						return true;
					}
				}
				return false;
			},
			model: {
				get() {
					return this.isGroup ? this._radioGroup.value : this.value;
				},
				set(val) {
					if(this.isGroup) {
						this._radioGroup.$emit('input',val);
					} else {
						this.$emit('input', val);	
					}
				}
			},
			isDisabled() {
				return this.isGroup ?
					this._radioGroup.disabled || this.disabled :
					this.disabled;
			},
		},
		methods: {
			handleChange() {
				this.$nextTick(() => {
					this.$emit('change', this.model);
					this.isGroup && this._radioGroup.$emit('change',this.model);
				});
			}
		}
	};
</script>
<style scoped>
.ibo-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
}
.ibo-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: middle;
}
.ibo-radio__label {
    font-size: 14px;
    padding-left: 10px;
}
.ibo-radio__inner {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.ibo-radio__inner::after {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%) scale(0);
    transform: translate(-50%,-50%) scale(0);
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6);
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6);
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6),-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6);
}
.ibo-radio__original {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
}
.ibo-radio__input.is-checked .ibo-radio__inner {
    border-color: #409EFF;
    background: #409EFF;
}
.ibo-radio__input.is-checked .ibo-radio__inner::after {
    -webkit-transform: translate(-50%,-50%) scale(1);
    transform: translate(-50%,-50%) scale(1);
}
.ibo-radio.is-bordered {
	padding: 12px 20px 0 10px;
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	height: 40px
}

.ibo-radio.is-bordered.is-disabled {
	cursor: not-allowed;
	border-color: #ebeef5
}
.ibo-radio.is-bordered.is-checked {
	border-color: #409EFF
}
.ibo-radio, .ibo-radio__inner, .ibo-radio__input {
    position: relative;
    display: inline-block;
}	

.ibo-radio__input.is-disabled+span.ibo-radio__label {
    color: #c0c4cc;
    cursor: not-allowed;
}
.ibo-radio__input.is-checked+.ibo-radio__label {
    color: #409eff;
}
.ibo-radio.is-bordered.is-disabled {
    cursor: not-allowed;
    border-color: #ebeef5;
}
.ibo-radio__input.is-disabled .ibo-radio__inner, .ibo-radio__input.is-disabled.is-checked .ibo-radio__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
}
</style>