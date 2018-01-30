<template>
	<div>
		<lxm-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" label-suffix='xx'>
		  	<lxm-form-item label="活动名称" prop="nameDDD" >
		    	<!--<el-input v-model="ruleForm.nameDDD"></el-input>-->
		    	<lxm-input v-model="ruleForm.nameDDD"></lxm-input>
		 	</lxm-form-item>
			<lxm-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
	  		</lxm-form-item>
		</lxm-form>
	</div>
</template>
<script>
  export default {
  	name:'formE',
    data() {
      return {
        ruleForm:{
          name: 'name in from model',
          nameDDD:'',
        },
        rules: {
          nameDDD: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        	console.log(valid,'valid-----><> ><> ><>submitForm() ')
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>