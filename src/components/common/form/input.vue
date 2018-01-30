<template>
	<div v-bind:class="['ibo-input',{'is-disabled': disabled}]">
		<slot name="icon">
	    <i class="ibo-input-icon iconfont" :style="iconstyle" :class="['icon-' + icon]" v-if="icon" @click="handleIconClick">
        </i>
		</slot>
		<input 
			@blur="blurVaule"
			:class="blurwarntip?'warnClass':''"  
			v-bind="$props" 
			ref="input" 
			v-model="currentValue" 
			type="text" 
			class="ibo-input-inner" 
			:style="inputstyle" 
			@keyup.enter="search($event)">
		<transition name="fade" v-if="blurwarntip">
			<span class="warntip" >{{warntip}}</span>
		</transition>
	</div>
</template>

<script>
	 import emitter from '../../../assets/js/mixins/emitter';
	export default {
		name: "lxmInput",
		componentName: 'lxmInput',
		mixins: [emitter],
		data: function() {
			return {
				currentValue: this.value,
				blurwarntip:false,
				tita:'',
			};
		},
		props: {
			placeholder: {
				type: String,
				default: '请输入内容'
			},
			autoComplete: {
				type: String,
				default: 'off'
			},
			readonly: Boolean,
			disabled: Boolean,
			icon: String,
			type: {
				type: String,
				default: 'text'
			},
			value: [String, Number],
			maxlength: Number,
			minlength: Number,
			iconclick: Function,
			enterclick:Function,
			iconstyle: Object,
			inputstyle: Object,
			
			warntip:[String, Number],
		},
		methods: {
			blurVaule(e){
				this.dispatch('lxmFormItem', 'el.form.blur', [this]);
				if(this.warntip){
					clearInterval (this.tita);
					if(!this.currentValue){
						this.blurwarntip = true;
					}else{
						this.blurwarntip = false;
					}
				}
			},
			handleIconClick(event) {
				if(this.iconclick) {
					this.iconclick(event);
				}
				this.$emit('click', event);
			},
			search(event){
				if(this.enterclick) {
					this.enterclick(event);
				}
				this.$emit('click', event);
			},
			commitclick(){
				this.$refs.input.focus();
				let i=0;
				this.tita = setInterval (function(){
					i++;
					if(i<6){
						this.blurwarntip = !this.blurwarntip;
					}else{
						clearInterval (this.tita);
						this.blurwarntip = true;
					}
				}.bind(this),400)
			},
		},
		watch: {
            value(val){
            	this.currentValue=val;
            },
            currentValue(val) {
				this.$emit('input', val);
			},
		}
	}
</script>
<style scoped>
	.warntip{
		color: red;
	}
	.warnClass{
		border-color: red;
	}
	.warnClass:focus{
		border-color: red;
	}
	.fade-enter-active, .fade-leave-active{
		transition: all 0.5s ease     
	}
	.fade-enter, .fade-leave-active{
		opacity: 0 
	}
</style>