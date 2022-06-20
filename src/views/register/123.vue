<template>
     <div class="rg_layout">
     <div class="rg_left">
         <p>新用户注册</p>
         <p>USER REGISTER</p>
     </div>
     <div class="rg_center">
         <div class="rg_form">
         <div style="margin: 50px 0;"></div>
         <el-form ref="form" :model="form" :rules="rules" label-width="80px">
             <el-form-item label="Email" prop="Email">
             <el-col :span="15">
                 <el-input placeholder="请输入邮箱号" v-model="form.Email"></el-input>
             </el-col>
             <el-col :span="9">
                 <el-button type="success" plain @click="sendEmail">发送邮件验证</el-button>
             </el-col>
             </el-form-item>
             <el-form-item label="用户名">
             <el-col :span="20">
                 <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
             </el-col>
             </el-form-item>
             <el-form-item label="密码">
             <el-input placeholder="请输入密码" v-model="form.password"></el-input>
             </el-form-item>
             <el-form-item label="性别">
             <el-col :span="5">
                 &lt;el-radio v-model="form.radio" label="1">男</el-radio>
             </el-col>
             <el-col :span="3">
                 <el-radio v-model="form.radio" label="2">女</el-radio>
             </el-col>
             </el-form-item>
             <el-form-item label="出生日期">
             <el-col :span="15">
                 <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
             </el-col>
             </el-form-item>
             <el-form-item label="验证码">
             <el-col :span="15">
                 <el-input
                     type="text"
                     placeholder="验证码将会发送到您的邮箱"
                     v-model="form.text"
                     oninput="value=value.replace(/\D/g,'')"
                     maxlength="6"
                     show-word-limit
                 >
                 </el-input>
             </el-col>
             </el-form-item>
             <el-form-item>
             <el-col :span="20">
                 <el-button type="primary" @click="onSubmit">立即注册</el-button>
             </el-col>
             </el-form-item>
         </el-form>
         </div>
     </div>
     <div class="rg_right">
         <p>已有账号?
         <el-link icon="el-icon-user-solid" type="primary" @click="login_asd">立刻登陆</el-link>
         </p>
     </div>

     </div>

</template>

<script>
import axios from "axios";
export default {
     mounted() {
     this.$store.state.yesOrNo = false
     },
     name: "signUp",
     data: function () {
     return {
         form: {
         Email: '',
         username: "",
         password: "",
         radio: '1',
         date: '',
         text: ''
         },
               rules: {
        email: [{
          required: true,
          type: 'email',
          message: '请输入邮箱',
          trigger: 'blur'
        },
        { pattern: /[1-9]\d{7,10}@qq\.com/, message: '请输入正确的邮箱！！！' }],
        code: [{
          required: true,
          type: 'string',
          message: '请输入验证码',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '创建密码',
          trigger: 'blur'
        }, { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, message: '密码必须同时包含数字与字母,且长度为 8-20位' }],
        cpwd: [{
          required: true,
          message: '确认密码',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]

      },
         msg: '',
     }
     },
     methods: {
     login_asd(){
         this.$router.replace({path: '/login'});
     },
     open1() {
         this.$message({
         showClose: true,
         message: this.msg,
         type: 'warning'
         });
     },
     open2() {
         this.$message({
         showClose: true,
         message: this.msg,
         type: 'success'
         });
     },
     open3() {
         this.$message({
         showClose: true,
         message: this.msg,
         type: 'error'
         });
     },
     sendEmail() {
         this.$refs.form.validate((valid) => {
         if (valid) {
             let _this = this
             axios.post(this.$store.state.url+':8412/user/sendSignUpCode?email='+_this.form.Email,
                 ).catch(function (error) {
                 _this.msg = "邮箱格式不正确！"
                 _this.open1()
             }).then(function (response) {
             if (response.data.code === 200) {
                 _this.msg = response.data.msg
                 _this.open2()
             } else {
                 _this.msg = response.data.msg
                 _this.open3()
             }
             })
         }
         })
     },
     onSubmit(){
         this.$refs.form.validate((valid) => {
         if (valid) {
             let _this = this;
             let tmp;
             if(this.form.radio === "1"){
             tmp = '男'
             }else{
             tmp = '女'
             }
             axios.post(this.$store.state.url+':8412/user/userSignUp?code='+_this.form.text,
                 {
                 email: this.form.Email,
                 username: this.form.username,
                 password: this.form.password,
                 sex: tmp,
                 birthday: this.form.date
                 }
             ).catch(function (error) {
             _this.msg = "邮箱格式有问题！"
             _this.open1()
             }).then(function (response) {
             if (response.data.code === 200) {
                 _this.msg = response.data.msg
                 _this.open2()
                 _this.$router.replace({path: '/login'});
             } else {
                 _this.msg = response.data.msg
                 _this.open3()
             }
             })
         }
         })
     }
     }
}
</script>


<style>
* {
     margin: 0px;
     padding: 0px;
     box-sizing: border-box;
}

body {
     background-image: url(https://img-blog.csdnimg.cn/76110abf7fb84ee28c50bfbfa7fa8e11.jpg);
     background-repeat: no-repeat;
     background-size: 100%;
     background-position: 0px -50px;
}

.rg_layout {
     width: 900px;
     height: 500px;
     border: 5px solid #EEEEEE;
     background-color: white;
     opacity: 0.8;
     /*让div水平居中*/
     margin: auto;
     margin-top: 100px;
}

.rg_left {
     float: left;
     margin: 15px;
     width: 20%;
}

.rg_left > p:first-child {
     color: #FFD026;
     font-size: 20px;
}

.rg_left > p:last-child {
     color: #A6A6A6;
}

.rg_center {
     /*border: 1px solid red;*/
     float: left;
     width: 450px;
     /*margin: 15px;*/
}

.rg_right {
     float: right;
     margin: 15px;
}

.rg_right > p:first-child {
     font-size: 15px;
}

.rg_right p a {
     color: pink;
}

</style>