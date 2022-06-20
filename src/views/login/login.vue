<template>
  <div class="content">
    <div id="login">
        <h1>Login</h1>
            <input type="text" required="required" placeholder="用户名" v-model="zh">
            <input type="password" required="required" placeholder="密码" v-model="mm">
            <button class="but"  @click="login">登录</button>
      {{zh}}
      {{mm}}
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import {ref} from "vue";
import {useRouter} from "vue-router";

let zh = ref('1535497815');
let mm = ref('1075945441');
let data =ref([]);
const router = useRouter()
const goDetail = () => {
      router.push({ path: '/index' })}
function login(){
axios.post('login', {
    zh: zh.value,
    mm:mm.value
  })
  .then(response =>{
    if(response['data']=='success'){
      goDetail()
      return false;
    }
  })
}
</script>
<style scoped>
.content{
  width: 100vw;
  height: 100vh;
  background: #7986ca;
}
#login{
    position: absolute;
    top: 50%;
    left:50%;
    margin: -150px 0 0 -150px;
    width: 300px;
    height: 300px;
}
#login h1{
    color: #fff;
    text-shadow:0 0 10px;
    letter-spacing: 1px;
    text-align: center;
}
h1{
    font-size: 2em;
    margin: 0.67em 0;
}
input{
    width: 278px;
    height: 18px;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 13px;
    border: none;
    border-radius: 4px;
  outline: none;
    background-color: #AFD7F7;
}
.but{
    width: 300px;
    min-height: 20px;
    display: block;
    background-color: #4a77d4;
    border: 1px solid #3762bc;
    color: #fff;
    padding: 9px 14px;
    font-size: 15px;
    line-height: normal;
    border-radius: 5px;
    margin: 0;
}
</style>