<template>
	<label class="ibo-radio-button" 
		:class="[
      		{ 'is-active': value === label },
      		{ 'is-disabled': isDisabled },
	    ]" 
	    role="radio" 
	    :aria-checked="value === label" 
	    :aria-disabled="isDisabled" 
	    @keydown.space.stop.prevent="value = label"
    >
	    <input
	      	class="ibo-radio-button__orig-radio"
	      	:value="label"
	      	type="radio"
	      	v-model="value"
	      	:name="name"
	      	@change="handleChange"
	      	:disabled="isDisabled"
	    >
	    <span class="ibo-radio-button__inner" >
	      	<slot></slot>
	      	<template v-if="!$slots.default">{{label}}</template>
	    </span>
  	</label>
</template>
<script>
	export default {
		name: 'lxmRadioButton',
		componentName: 'lxmRadioButton',
		props: {
			label: {},
			disabled: Boolean,
			name: String
		},
		computed: {
			value: {
				get() {
					return this._radioGroup.value;
				},
				set(value) {
					this._radioGroup.$emit('input', value);
				}
			},
			_radioGroup() {
				let parent = this.$parent;
				while(parent) {
					if(parent.$options.componentName !== 'lxmRadioGroup') {
						parent = parent.$parent;
					} else {
						return parent;
					}
				}
				return false;
			},
			isDisabled() {
				return this.disabled || this._radioGroup.disabled;
			},
		},
		methods: {
			handleChange() {
				this.$nextTick(() => {
					this._radioGroup.$emit('change',this.value);
				});
			}
		}
	};
</script>
<style scoped>
.ibo-radio-button,
.ibo-radio-button__inner {
	display: inline-block;
	position: relative;
	outline: 0;
    float: left;
}
.ibo-radio-button__inner {
	line-height: 1;
	white-space: nowrap;
	background: #fff;
	border: 1px solid #dcdfe6;
	font-weight: 500;
	border-left: 0;
	color: #606266;
	-webkit-appearance: none;
	text-align: center;
	box-sizing: border-box;
	margin: 0;
	cursor: pointer;
	-webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
	transition: all .3s cubic-bezier(.645, .045, .355, 1);
	padding: 12px 20px;
	font-size: 14px;
	border-radius: 0
}

.ibo-radio-button__inner.is-round {
	padding: 12px 20px
}

.ibo-radio-button__inner:hover {
	color: #409EFF
}

.ibo-radio-button__inner [class*=ibo-icon-] {
	line-height: .9
}

.ibo-radio-button__inner [class*=ibo-icon-]+span {
	margin-left: 5px
}

.ibo-radio-button__orig-radio {
	opacity: 0;
	outline: 0;
	position: absolute;
	z-index: -1;
	left: -999px
}

.ibo-radio-button__orig-radio:checked+.ibo-radio-button__inner {
	color: #fff;
	background-color: #409EFF;
	border-color: #409EFF;
	-webkit-box-shadow: -1px 0 0 0 #409EFF;
	box-shadow: -1px 0 0 0 #409EFF
}

.ibo-radio-button__orig-radio:disabled+.ibo-radio-button__inner {
	color: #c0c4cc;
	cursor: not-allowed;
	background-image: none;
	background-color: #fff;
	border-color: #ebeef5;
	-webkit-box-shadow: none;
	box-shadow: none
}

.ibo-radio-button__orig-radio:disabled:checked+.ibo-radio-button__inner {
	background-color: #f2f6fc
}

.ibo-radio-button:first-child .ibo-radio-button__inner {
	border-left: 1px solid #dcdfe6;
	border-radius: 4px 0 0 4px;
	-webkit-box-shadow: none!important;
	box-shadow: none!important
}

.ibo-radio-button:last-child .ibo-radio-button__inner {
	border-radius: 0 4px 4px 0
}

.ibo-radio-button:first-child:last-child .ibo-radio-button__inner {
    border-radius: 4px;
}

.ibo-radio-button:focus:not(.is-focus):not(:active) {
	-webkit-box-shadow: 0 0 2px 2px #409EFF;
	box-shadow: 0 0 2px 2px #409EFF
}
	
</style>