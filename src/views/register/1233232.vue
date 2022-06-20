<template>
  <div class="register-container">
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        autocomplete="off"
        hide-required-asterisk="true"
        size="medium"
      >
        <div style="padding-top: 10px">
          <el-form-item label="邮箱" prop="email">
            <el-col :span="18">
              <el-input
                v-model="ruleForm.email"
                placeholder="输入邮箱并点击发送验证码"
              />
            </el-col>
            <el-button
              :loading="codeLoading"
              :disabled="isDisable"
              size="small"
              round
              @click="sendMsg"
            >发送验证码</el-button>
            <span class="status">{{ statusMsg }}</span>
          <el-form-item label="密码" prop="pwd">
            <el-col :span="18">
              <el-input v-model="ruleForm.pwd" type="password" />
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码" prop="cpwd">
            <el-col :span="18">
              <el-input v-model="ruleForm.cpwd" type="password" />
            </el-col>
          </el-form-item>
                      </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-col :span="18">
              <el-input
                v-model="ruleForm.code"
                maxlength="6"
                placeholder="请登录邮箱接收验证码"
              />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 40%"
              @click="register"
            >注册</el-button>
          </el-form-item>
        </div>
      </el-form>
    </section>

    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data() {
    return {
      statusMsg: '',
      error: '',
      isDisable: false,
      codeLoading: false,
      ruleForm: {
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
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

      }
    }
  },
  methods: {
    sendMsg: function() {
 },
  }
}
</script>


<style scoped>
/* 修改验证器样式 */
/deep/ .el-form-item.is-error .el-input__inner {
  border-color: #889aa4;
}
/deep/ .el-form-item.is-error .el-input__validateIcon {
  color: #889aa4;
}
/deep/ .el-form-item__error {
  color: #e6a23c;
}
</style>