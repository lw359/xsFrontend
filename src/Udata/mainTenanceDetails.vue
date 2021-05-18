<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>用户详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- 用户id -->
        <el-form-item label="用户编号" prop="id" >
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <!-- 用户名称 -->
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" :disabled="true"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话" prop="iPhone">
          <el-input v-model="form.iphone" :disabled="true"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" :disabled="true"></el-input>
        </el-form-item>
<!--        &lt;!&ndash; 照片 &ndash;&gt;-->
<!--        <el-form-item label="头像" prop="photo">-->
<!--          <input type="file" @change="getFileImage($event)">-->
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
          iphone:""

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
        this.$axios.post("/queryByidUser.action?id="+id).then(function (response) {
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
