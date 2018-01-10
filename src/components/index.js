import Dropdown from './common/dropdown/dropdown'
import Directive from '../assets/js/common/Vue-directive';


Dropdown.install = function(Vue){
	Vue.component(Dropdown.name,Dropdown);//全局注册组件
}


const components=[
	Dropdown,

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
