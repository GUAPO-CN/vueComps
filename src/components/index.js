import Dropdown from './common/dropdown/dropdown'
import Checkbox from './common/checkbox/checkbox'
import CheckboxGroup from './common/checkbox/checkbox-group'
import CheckboxButton from './common/checkbox/checkbox-button'
import Radio from './common/radio/radio'
import RadioGroup from './common/radio/radio-group'
import RadioButton from './common/radio/radio-button'
import Directive from '../assets/js/common/Vue-directive';


Dropdown.install = function(Vue){
	Vue.component(Dropdown.name,Dropdown);//全局注册组件
}
Checkbox.install = function(Vue){
	Vue.component(Checkbox.name,Checkbox);//全局注册组件
}
CheckboxGroup.install = function(Vue){
	Vue.component(CheckboxGroup.name,CheckboxGroup);//全局注册组件
}
CheckboxButton.install = function(Vue){
	Vue.component(CheckboxButton.name,CheckboxButton);//全局注册组件
}
Radio.install = function(Vue){
	Vue.component(Radio.name,Radio);//全局注册组件
}
RadioGroup.install = function(Vue){
	Vue.component(RadioGroup.name,RadioGroup);//全局注册组件
}
RadioButton.install = function(Vue){
	Vue.component(RadioButton.name,RadioButton);//全局注册组件
}

const components=[
	Dropdown,
	Checkbox,
	CheckboxGroup,
	CheckboxButton,
	Radio,
	RadioGroup,
	RadioButton,
];

const install = function(Vue,opts = {}){
	if(install.installed) return ;
	Vue.use(Directive);//注册指令
	components.map( component => {
		Vue.component(component.name,component);//安装 (注册)组件
	})
}

export default {
	install,
}
