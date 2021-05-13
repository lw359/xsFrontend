<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>供应商管理 >  供应商详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- ID -->
        <el-form-item label="ID" prop="gysId" >
          <el-input v-model="form.gysId" :disabled="true"></el-input>
        </el-form-item>
        <!-- 供应商编号 -->
        <el-form-item label="供应商编号" prop="supId" >
          <el-input v-model="form.supId" :disabled="true"></el-input>
        </el-form-item>
        <!-- 供应商名称 -->
        <el-form-item label="供应商名称" prop="gysName" >
          <el-input v-model="form.gysName" :disabled="true"></el-input>
        </el-form-item>
        <!-- 电话号码 -->
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="form.phone" :disabled="true"></el-input>
        </el-form-item>
        <!-- 联系人 -->
        <el-form-item label="联系人" prop="supName">
          <el-input v-model="form.supName" :disabled="true"></el-input>
        </el-form-item>
        <!-- 联系电话 -->
        <el-form-item label="联系电话" prop="supPhone">
          <el-input v-model="form.supPhone" :disabled="true"></el-input>
        </el-form-item>
        <!-- 联系地址 -->
        <el-form-item label="联系地址" prop="supAddress">
          <el-input v-model="form.supAddress" :disabled="true"></el-input>
        </el-form-item>
        <!-- 审核状态 -->
        <el-form-item label="审核状态" prop="auditState">
          <el-select :disabled="true" v-model="form.auditState" size="medium" clearable  placeholder="请选择状态">
            <el-option
              v-for="item in Stated"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
        this.$axios.post("/queryByidSupplier.action?id="+id).then(function (response) {
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
