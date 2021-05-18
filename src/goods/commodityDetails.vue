<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>商品分类详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- 分类编号 -->
        <el-form-item label="分类ID" prop="spTypeId">
          <el-input v-model="form.spTypeId" :disabled="true"></el-input>
        </el-form-item>
        <!-- 分类编号 -->
        <el-form-item label="分类编号" prop="kindid">
          <el-input v-model="form.kindid" :disabled="true"></el-input>
        </el-form-item>
        <!-- 分类名称 -->
        <el-form-item label="分类名称" prop="kindName">
          <el-input v-model="form.kindName" :disabled="true"></el-input>
        </el-form-item>
        <!-- 分类级别 -->
        <el-form-item label="分类级别" prop="kindjibie">
          <el-input v-model="form.kindjibie" :disabled="true"></el-input>
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
          region: '',
          iphone:"",
          spTypeId:""

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
        this.$axios.post("/queryById.action?id="+id).then(function (response) {
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
