<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>菜单详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- 菜单编号 -->
        <el-form-item label="菜单编号" prop="mid">
          <el-input v-model="form.mid" :disabled="true"></el-input>
        </el-form-item>
        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <!-- 菜单代码 -->
        <el-form-item label="菜单url" prop="url">
          <el-input v-model="form.url" :disabled="true"></el-input>
        </el-form-item>
        <!-- 菜单描述 -->
        <el-form-item label="菜单描述" prop="descn">
          <el-input v-model="form.descn" :disabled="true"></el-input>
        </el-form-item>


      </el-form>
    </el-main>
  </div>
</template>

<script>
export default {
    name: "",
    id:"",
    data(){
      return{
        form: {
          name: '',
          region: ''
        },
        //存放状态
        Stated:[
          {id:"G-001",name:"未审核"},
          {id:"G-002",name:"审核通过"},
          {id:"G-003",name:"审核不通过"}
        ],
      }
    },
    created() {
      this.getId();
    },
    methods:{
      getId(){
        let id = this.$route.query.id;
        var _this =this;
        this.$axios.post("/queryByidMenus.action?mid="+id).then(function (response) {
          _this.form=response.data;
        }).catch()
      },
      onSubmit() {
      }
    }
}
</script>

<style scoped>

</style>
