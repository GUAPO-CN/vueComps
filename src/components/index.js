import Dropdown from './common/dropdown/dropdown'
import Checkbox from './common/checkbox/checkbox'
import CheckboxGroup from './common/checkbox/checkbox-group'
import CheckboxButton from './common/checkbox/checkbox-button'
import Radio from './common/radio/radio'
import RadioGroup from './common/radio/radio-group'
import RadioButton from './common/radio/radio-button'
import Directive from '../assets/js/common/Vue-directive';
import Row from './common/row/row';
import Col from './common/col/col';
import Breadcrumb from './common/breadcrumb/breadcrumb';
import BreadcrumbItem from './common/breadcrumb/breadcrumb-item';
import Form from './common/form/form';
import FormItem from './common/form/form-item';
import Input from './common/form/input';
import Carousel from './common/carousel/main';
import CarouselItem from './common/carousel/item';
//Dropdown.install = function(Vue){
//	Vue.component(Dropdown.name,Dropdown);//全局注册组件
//}
const components = [
	Dropdown,
	Checkbox,
	CheckboxGroup,
	CheckboxButton,
	Radio,
	RadioGroup,
	RadioButton,
	Row,
	Col,
	Breadcrumb,
	BreadcrumbItem,
	Form,
	FormItem,
	Input,
	Carousel,
	CarouselItem,
];
components.map( cp => {
	cp.install = function(Vue){
		Vue.component(cp.name,cp);//全局注册组件
	}
})


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
