<template>
	<form class="el-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]">
		<slot></slot>
	</form>
</template>
<script>
	export default {
		name: 'lxmForm',

		componentName: 'lxmForm',

		provide() {
			return {
				elForm: this
			};
		},

		props: {
			model: Object,
			rules: Object,
			labelPosition: String,
			labelWidth: String,
			labelSuffix: {
				type: String,
				default: ''
			},
			inline: Boolean,
			inlineMessage: Boolean,
			statusIcon: Boolean,
			showMessage: {
				type: Boolean,
				default: true
			},
			size: String
		},
		watch: {
			rules() {
				this.validate();
			}
		},
		data() {
			return {
				fields: [] //子组件 form-item
			};
		},
		created() {
//			console.log(this.fields,'created ------->>>>>   form compoment')
			this.$on('el.form.addField', (field) => {
//				console.log('el.form.addField-------->>>>>子组件form-item触发   form compoment')
				if(field) {
					this.fields.push(field);
				}
			});
			/* istanbul ignore next */
			this.$on('el.form.removeField', (field) => {
				console.log(2222222222)
				if(field.prop) {
					this.fields.splice(this.fields.indexOf(field), 1);
				}
			});
		},
		methods: {
			resetFields() {
				if(!this.model) {
					process.env.NODE_ENV !== 'production' &&
						console.warn('[Element Warn][Form]model is required for resetFields to work.');
					return;
				}
				this.fields.forEach(field => {
					field.resetField();
				});
			},
			clearValidate() {
				this.fields.forEach(field => {
					field.clearValidate();
				});
			},
			validate(callback) {
				//console.log(this.model,'this.model-----><2> ><> ><>validate() ')
				if(!this.model) {
					console.warn('[Element Warn][Form]model is required for validate to work!');
					return;
				}
				
				//console.log(typeof callback,'callback-----><3> ><> ><>validate() ') 
				// if no callback, return promise
				let promise;
				if(typeof callback !== 'function' && window.Promise) {
					promise = new window.Promise((resolve, reject) => {
						callback = function(valid) {
							valid ? resolve(valid) : reject(valid);
						};
					});
				}

				let valid = true;
				let count = 0;
				// 如果需要验证的fields为空，调用验证时立刻返回callback
				console.log(this.fields,'this.fields-----><3> ><> ><>validate() ') 
				if(this.fields.length === 0 && callback) {
					callback(true);
				}
				this.fields.forEach((field, index) => {
					field.validate('', errors => {
						console.log(errors,'errrrrrrrrrrrrr')
						if(errors) {
							valid = false;
						}
						if(typeof callback === 'function' && ++count === this.fields.length) {
							callback(valid);
						}
					});
				});

				if(promise) {
					return promise;
				}
			},
			validateField(prop, cb) {
				let field = this.fields.filter(field => field.prop === prop)[0];
				if(!field) {
					throw new Error('must call validateField with valid prop string!');
				}

				field.validate('', cb);
			}
		}
	};
</script>