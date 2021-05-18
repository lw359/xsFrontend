<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>角色详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main >
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="角色编号" prop="rid">
          <el-input v-model="form.rid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <!-- 角色代码 -->
        <el-form-item label="角色代码" prop="code" >
          <el-input v-model="form.code" :disabled="true"></el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="descn">
          <el-input v-model="form.descn" :disabled="true"></el-input>
        </el-form-item>
        <!-- 审核状态 -->
        <!--        <el-form-item label="审核状态" prop="auditState">-->
        <!--          <el-select :disabled="true" v-model="form.auditState" size="medium" clearable  placeholder="请选择状态">-->
        <!--            <el-option-->
        <!--              v-for="item in Stated"-->
        <!--              :key="item.id"-->
        <!--              :label="item.name"-->
        <!--              :value="item.id">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
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
          minKc:'',
          maxKc:'',
          maxamount:'',
          kcName:'',
        },
        //存放状态
        // Stated:[
        //   {id:"G-001",name:"未审核"},
        //   {id:"G-002",name:"审核通过"},
        //   {id:"G-003",name:"审核不通过"}
        // ],
      }
    },
    created() {
      this.getId();
    },
    methods:{
      getId(){
        let id = this.$route.query.id;
        var _this =this;
        this.$axios.post("/queryByidRoles.action?rid="+id).then(function (response) {
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
