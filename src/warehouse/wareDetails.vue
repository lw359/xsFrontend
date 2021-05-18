<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>仓库管理 >  仓库详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main >
      <el-form ref="form" :model="form" label-width="110px">
        <!-- 仓库编号 -->
        <el-form-item label="仓库编号" prop="id" >
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <!-- 仓库名称 -->
        <el-form-item label="仓库名称" prop="kcName" >
          <el-input v-model="form.kcName" :disabled="true"></el-input>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" prop="goodsName">
          <el-input v-model="form.goodsName" :disabled="true"></el-input>
        </el-form-item>
        <!-- 仓库最小存储量 -->
        <el-form-item label="商品最小存储量" prop="minKc">
          <el-input v-model="form.minKc" :disabled="true"></el-input>
        </el-form-item>
        <!-- 仓库最大存储量 -->
        <el-form-item label="商品最大存储量" prop="maxKc">
          <el-input v-model="form.maxKc" :disabled="true"></el-input>
        </el-form-item>
        <!-- 仓库最小存储量 -->
        <el-form-item label="仓库最小存储量" prop="amount">
          <el-input v-model="form.amount" :disabled="true"></el-input>
        </el-form-item>
        <!-- 仓库最大存储量 -->
        <el-form-item label="仓库最大存储量" prop="maxamount">
          <el-input v-model="form.maxamount" :disabled="true"></el-input>
        </el-form-item>
        <!-- 登记人 -->
        <el-form-item label="登记人" prop="register">
          <el-input v-model="form.register" :disabled="true"></el-input>
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
        this.$axios.post("/warehouseById.action?id="+id).then(function (response) {
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
