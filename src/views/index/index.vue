<template>

  <div class="common-layout">
    <el-container>
      <el-header class="header"></el-header>
      <el-main class="main">
        <div class="main1">
<file></file>
          <div class="upload">
  <el-upload
    class="upload-demo"
    drag
    action="http://127.0.0.1:5000/upload"
    multiple
    :with-credentials=true
    :headers="uploadhead"
  >
    <el-icon class="el-icon--upload"><UploadFilled></UploadFilled></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload></div></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import file from '/src/components/filelist'
export default {
  components:{
    file,
  },
  data(){
    return{
      uploadhead:{
        zichen:'1535497815'
      }
    }
  },
  methods:{
    use:function (){
      console.log('zichen ')
    }
    }
}
</script>

<style scoped>
.upload{
  margin-top: 100px;
}
.header{
  width: 100%;
  height: 5vh;
  background-color: #42b983;
}

</style>