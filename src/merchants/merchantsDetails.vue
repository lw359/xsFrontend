<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>商户管理 >  商户详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- ID -->
        <el-form-item label="商户id" prop="shid" >
          <el-input v-model="form.shid" :disabled="true"></el-input>
        </el-form-item>
        <!-- 商户名字 -->
        <el-form-item label="商户名称" prop="shangHuName" >
          <el-input v-model="form.shangHuName" ></el-input>
        </el-form-item>
        <!-- 商户电话 -->
        <el-form-item label="商户电话" prop="phone" >
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 商户地址 -->
        <el-form-item label="商户地址" prop="menDianAdrss">
          <el-input v-model="form.menDianAdrss"></el-input>
        </el-form-item>
        <!-- 联系人 -->
        <el-form-item label="联系人" prop="shhulxr">
          <el-input v-model="form.shhulxr"></el-input>
        </el-form-item>
        <!-- 商户盈利 -->
        <el-form-item label="商户盈利" prop="yl">
          <el-input v-model="form.yl"></el-input>
        </el-form-item>
        <!-- 审核状态 -->
        <el-form-item label="审核状态" prop="merstate">
          <el-select :disabled="true" v-model="form.merstate" size="medium" clearable  placeholder="请选择状态">
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
          region: '',
          merstate: "",
          shangHuName: "",
          menDianAdrss: "",
          shStat: "",
          yl: "",
          shhulxr: "",
        },
        //存放状态
        //存放状态
        Stated:[
          {id:"M-001",name:"未审核"},
          {id:"M-002",name:"审核通过"},
          {id:"M-003",name:"审核不通过"}
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
        this.$axios.post("/queryByidMerch.action?id="+id).then(function (response) {
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
