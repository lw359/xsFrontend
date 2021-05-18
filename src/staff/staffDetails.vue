<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>员工详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- 员工工号 -->
        <el-form-item label="员工工号" prop="empno">
          <el-input v-model="form.empno" :disabled="true"></el-input>
        </el-form-item>
        <!-- 员工名称 -->
        <el-form-item label="员工名称" prop="empname">
          <el-input v-model="form.empname" :disabled="true"></el-input>
        </el-form-item>
        <!-- 员工性别 -->
        <el-form-item label="员工性别" prop="empsex">
          <el-input v-model="form.empsex" :disabled="true"></el-input>
        </el-form-item>
        <!--             员工出生日期 -->
        <!--            <el-form-item label="员工出生日期" prop="empbirth">-->
        <!--              <el-input v-model="addForm.empbirth"></el-input>-->
        <!--            </el-form-item>-->
<!--         员工入职日期 -->
                    <el-form-item label="员工入职日期" prop="empworktime">
                      <el-input v-model="form.empworktime" :disabled="true"></el-input>
                    </el-form-item>
        <!-- 员工职务 -->
        <el-form-item label="员工职务" prop="empwork">
          <el-input v-model="form.empwork" :disabled="true"></el-input>
        </el-form-item>
        <!-- 所属部门 -->
        <el-form-item label="所属部门" prop="department">
          <el-input v-model="form.department" :disabled="true"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" :disabled="true" show-password></el-input>
        </el-form-item>
        <!-- 员工电话 -->
        <el-form-item label="员工电话" prop="phone">
          <el-input v-model="form.phone" :disabled="true"></el-input>
        </el-form-item>
        <!-- 员工电话 -->
        <el-form-item label="员工邮箱" prop="email">
          <el-input v-model="form.email" :disabled="true"></el-input>
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
        this.$axios.post("/queryByidStaff.action?uid="+id).then(function (response) {
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
