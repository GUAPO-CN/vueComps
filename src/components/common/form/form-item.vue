<template>
  <div class="el-form-item" :class="[{
      'el-form-item--feedback': elForm && elForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required
    },
    sizeClass ? 'el-form-item--' + sizeClass : ''
  ]">
    <label :for="labelFor" class="el-form-item__label" v-bind:style="labelStyle" v-if="label || $slots.label">
      <slot name="label">{{label + form.labelSuffix}}</slot>
    </label>
    <div class="el-form-item__content" v-bind:style="contentStyle">
      <slot ></slot>
      <transition name="el-zoom-in-top">
        <div
          v-if="validateState === 'error' && showMessage && form.showMessage"
          class="el-form-item__error"
          :class="{
            'el-form-item__error--inline': typeof inlineMessage === 'boolean'
              ? inlineMessage
              : (elForm && elForm.inlineMessage || false)
          }"
        >
          {{validateMessage}}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator'; //异步校验 库
  import emitter from '../../../assets/js/mixins/emitter';
  import objectAssign from '../../../assets/js/utils/merge';  //把对象 搞成好看的 给异步验证库
  import { noop, getPropByPath } from '../../../assets/js/utils/util';

  export default {
    name: 'lxmFormItem',

    componentName: 'lxmFormItem',

    mixins: [emitter],

    provide() {
      return {
        elFormItem: this
      };
    },

    inject: ['elForm'],

    props: {
      label: String,
      labelWidth: String,
      prop: String,
      required: {
        type: Boolean,
        default: undefined
      },
      rules: [Object, Array],
      error: String,
      validateStatus: String,
      for: String,
      inlineMessage: {
        type: [String, Boolean],
        default: ''
      },
      showMessage: {
        type: Boolean,
        default: true
      },
      size: String
    },
    watch: {
      error: {
        immediate: true,
        handler(value) {
          this.validateMessage = value;
          this.validateState = value ? 'error' : '';
        }
      },
      validateStatus(value) {
        this.validateState = value;
      }
    },
    computed: {
      labelFor() {
        return this.for || this.prop;
      },
      labelStyle() {
        var ret = {};
        if (this.form.labelPosition === 'top') return ret;
        var labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.width = labelWidth;
        }
        return ret;
      },
      contentStyle() {
        var ret = {};
        const label = this.label;
        if (this.form.labelPosition === 'top' || this.form.inline) return ret;
        if (!label && !this.labelWidth && this.isNested) return ret;
        var labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.marginLeft = labelWidth;
        }
        return ret;
      },
      form() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
        while (parentName !== 'lxmForm') {
          if (parentName === 'lxmFormItem') {
            this.isNested = true;
          }
          parent = parent.$parent;
          parentName = parent.$options.componentName;
        }
        return parent;
      },
      fieldValue: {  ///根据 父组件（form）的model 与 prop 查询  获取子组件（例如input）的值 --------》用于初始化值 等
        cache: false,  //computed cache 设置为false时清除缓存，每次获取的是新值 
        get() {
          var model = this.form.model;
          if (!model || !this.prop) { return; }

          var path = this.prop;
          if (path.indexOf(':') !== -1) {
            path = path.replace(/:/, '.');
          }
//        console.log(getPropByPath(model, path, true).v,'fieldValue--------> computed')

          return getPropByPath(model, path, true).v;
        }
      },
      isRequired() {
        let rules = this.getRules('in computed isRequired()');
        let isRequired = false;
        if (rules && rules.length) {
          rules.every(rule => {
            if (rule.required) {
              isRequired = true;
              return false;
            }
            return true;
          });
        }
//      console.log(isRequired)
        return isRequired;
      },
      _formSize() {
        return this.elForm.size;
      },
      elFormItemSize() {
        return this.size || this._formSize;
      },
      sizeClass() {
        return (this.$ELEMENT || {}).size || this.elFormItemSize;
      }
    },
    data() {
      return {
        validateState: '',
        validateMessage: '',
        validateDisabled: false,
        validator: {},
        isNested: false
      };
    },
    methods: {
      validate(trigger, callback = noop) {  //异步校验 3
        this.validateDisabled = false;
        var rules = this.getFilteredRule(trigger);  //去处理校验 对象  4
        console.log(rules,'rules validate()')
        if ((!rules || rules.length === 0) && this.required === undefined) {
          callback();
          return true;
        }

        this.validateState = 'validating';  //校验状态 7

        var descriptor = {};
        if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger;
          });
        }
        descriptor[this.prop] = rules;
				console.log(descriptor,'descriptor--------->methods validate()')
        var validator = new AsyncValidator(descriptor);   //获取异步校验 对象     8
        var model = {}; //子组件 填写的值

        model[this.prop] = this.fieldValue;
				console.log(this.fieldValue,'this.fieldValue validate() --->子组件 填写的值')
				
        validator.validate(model, { firstFields: true }, (errors, fields) => {  //进行校验     9
          this.validateState = !errors ? 'success' : 'error';
          this.validateMessage = errors ? errors[0].message : '';
          
          console.log(this.validateState,'this.validateState validate()  --->校验完毕  状态')
					console.log(this.validateMessage,'this.validateMessage validate()  --->校验完毕   错误提示 成功为空')
					
          callback(this.validateMessage);  //校验完成回调     10
        });
      },
      clearValidate() {
        this.validateState = '';
        this.validateMessage = '';
        this.validateDisabled = false;
      },
      resetField() {  //重置 所有 子组件的 值??
        this.validateState = '';
        this.validateMessage = '';

        let model = this.form.model;
        let value = this.fieldValue;
        let path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        let prop = getPropByPath(model, path, true);

        if (Array.isArray(value)) {
          this.validateDisabled = true;
          prop.o[prop.k] = [].concat(this.initialValue);
        } else {
          this.validateDisabled = true;
          prop.o[prop.k] = this.initialValue;
        }
      },
      getRules(consoleLog) { //获取 校验 规则 给 异步校验 库  6
//    	console.log(consoleLog,'consoleLog --------> getRules()执行顺序')
        var formRules = this.form.rules;
        var selfRules = this.rules;
        var requiredRule = this.required !== undefined ? { required: !!this.required } : []; //是否为 必填项
        
//				console.log(formRules,'formRules--------> methods getRules()')
        formRules = formRules ? getPropByPath(formRules, this.prop || '').o[this.prop || ''] : [];  //根据 prop类型 获取规则
        
        return [].concat(selfRules || formRules || []).concat(requiredRule);
      },
      getFilteredRule(trigger) {
        var rules = this.getRules('in methods getFilteredRule()');  //拿到 校验规则  5
//				console.log(rules,'rules ---------> methods getFilteredRule()')
        return rules.filter(rule => {
          return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
        }).map(rule => objectAssign({}, rule));  //把对象 搞成好看的 给异步验证库
      },
      onFieldBlur() { // 子组件 失去焦点 触发 2
      	console.log('xeee')
        this.validate('blur'); // 子组件 失去焦点 触发 2 进行校验
      },
      onFieldChange() {
        if (this.validateDisabled) {
          this.validateDisabled = false;
          return;
        }

        this.validate('change');
      }
    },
    mounted() {
      if (this.prop) {
        this.dispatch('lxmForm', 'el.form.addField', [this]);//此dispatch被重写了 ----》见 emiiter.js

        let initialValue = this.fieldValue;
        if (Array.isArray(initialValue)) {
          initialValue = [].concat(initialValue);
        }
        Object.defineProperty(this, 'initialValue', {
          value: initialValue
        });      ///initialValue 只读了
        console.log(this.initialValue,'this.initialValue---------> mounted')
        let rules = this.getRules('in mounted');

        if (rules.length || this.required !== undefined) {
          this.$on('el.form.blur', this.onFieldBlur);  // 子组件 失去焦点 触发 1
          this.$on('el.form.change', this.onFieldChange);
        }
      }
    },
    beforeDestroy() {
      this.dispatch('lxmForm', 'el.form.removeField', [this]);
    }
  };
</script>
