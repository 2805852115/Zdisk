<template>
    <div class="show">
      <div class="single" v-for="(i,index) in data" >
     <component  :is="i['icon']"  style="width: 40px; height:40px;color:purple;"></component>
    <a :title="i['name']" :key="index" @click="use(index)">{{i['name']}}</a></div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "filelist",
  data(){
    return{
      size:'40px',
      color:'purple',
      data:[],
    }
  },
  methods:{
    use:function (index){
      axios.get('Download', {
        withCredentials: true,
    params: {
      name: this.data[index]['name']
    }
  })
    }
  },
  mounted() {
   axios.get('/datalist')
  .then(response =>{
    this.data=response['data']
  })
  }
}
</script>

<style scoped>
.show{
  width: 100vw;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.single{
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
a{
  display: block;
 max-width: 60px;
  font-size: 12px;
 overflow: hidden;
 white-space: nowrap;
 text-overflow: ellipsis

}
a:hover{
  color: #42b983;
}

</style>