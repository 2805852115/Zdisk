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
                 <el-button type="success"  @click="sendEmail">发送邮件验证</el-button>
             </el-col>
             </el-form-item>
             <el-form-item label="用户名" prop="username">
             <el-col :span="20" >
                 <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
             </el-col>
             </el-form-item>
             <el-form-item label="密码" prop="password">
             <el-input placeholder="请输入密码" v-model="form.password" type="password"></el-input>
             </el-form-item>
            <el-form-item label="确认密码" prop="cpwd">
            <el-col :span="18">
              <el-input v-model="form.cpwd" type="password" placeholder="请再次输入密码"/>
            </el-col>
          </el-form-item>
             <el-form-item label="验证码" prop="code">
             <el-col :span="15">
                 <el-input
                     type="text"
                     placeholder="请输入验证码"
                     v-model="form.code"
                     maxlength="5"
                     show-word-limit
                 >
                 </el-input>
             </el-col>
             </el-form-item>
             <el-form-item>
             <el-col :span="20">
                 <el-button type="primary" @click="submit">立即注册</el-button>
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
     // mounted() {
     // this.$store.state.yesOrNo = false
     // },
     name: "signUp",
     data: function () {
     return {
         form: {
         Email: '',
         username: "",
         password: "",
         cpwd: '',
         code: ''
         },
        rules: {
        Email: [{
          required: true,
          type: 'email',
          message: '请输入邮箱',
          trigger: 'blur'
        },
        { pattern: /[1-9]\d{7,10}@qq\.com/, message: '请输入正确的邮箱！！！' ,trigger: 'blur'}],
        code: [{
          required: true,
          type: 'string',
          message: '请输入正确验证码',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          min:6,
          max:11,
          type: 'string',
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, message: '密码必须同时包含数字与字母,且长度为 8-20位' }],
        cpwd: [{
          required: true,
          message: '请再次输入密码',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.form.password) {
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
         console.log(this)
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
     this.$refs['form'].validateField('email', (valid) => {
        this.emailPass = valid

      })
      // 向后台API验证码发送
      if (!this.emailPass) {
        self.codeLoading = true
        self.statusMsg = '验证码发送中...'
        axios.get('sendmail', {
            params: {
              mail: this.form.Email
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
   }
     },
     submit(){
     console.log(this.$cookies.get('code'))
    axios.post('/register', {
      username:this.form.username,
      password:this.form.password,
      mail:this.form.Email,
      md5:this.$cookies.get('code'),
      code:this.form.code
  })
  .then(response => {
    alert(response['data'])
    if(response.data=='注册成功') {
      this.$router.replace({path: '/login'})
    }
    else{

    }
})
  .catch((error =>{
    alert('服务器出现连接错误，请稍后再试！！')
  }))

   }
     }
}
</script>


<style scoped>
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