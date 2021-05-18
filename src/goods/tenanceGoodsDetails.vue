<template>
  <div id="#app">
    <el-header>
      <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
        <el-menu-item style="margin-top: -18px">
          <h1>商品详情信息</h1>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- 商品编号 -->
        <el-form-item label="商品编号" prop="spId" >
          <el-input v-model="form.spId":disabled="true"></el-input>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goodsName" >
          <el-input v-model="form.goodsName" :disabled="true"></el-input>
        </el-form-item>
        <!-- 商品单价 -->
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" :disabled="true"></el-input>
        </el-form-item>
        <!-- 商品进价 -->
        <el-form-item label="进价" prop="purchasePrice">
          <el-input v-model="form.purchasePrice" :disabled="true"></el-input>
        </el-form-item>
        <!-- 商品数量 -->
        <el-form-item label="数量" prop="sl" :disabled="true">
          <el-input v-model="form.sl" :disabled="true"></el-input>
        </el-form-item>
        <!-- 商品图片 -->
<!--        <el-form-item label="图片" prop="img">-->
<!--          <input type="file" @change="getFileImage($event)">-->
<!--        </el-form-item>-->

        <!-- 商品颜色 -->
<!--        <el-form-item label="商品颜色" prop="color">-->
<!--          <el-input v-model="form.color"></el-input>-->
<!--        </el-form-item>-->
<!--        &lt;!&ndash; 商品尺码 &ndash;&gt;-->
<!--        <el-form-item label="商品尺码" prop="size">-->
<!--          <el-input v-model="form.size"></el-input>-->
<!--        </el-form-item>-->
<!--        &lt;!&ndash; 商品产地 &ndash;&gt;-->
<!--        <el-form-item label="商品产地" prop="cpAdress">-->
<!--          <el-input v-model="form.cpAdress"></el-input>-->
<!--        </el-form-item>-->
        <!-- 商品分类级别 -->
        <el-form-item label="商品分类级别" prop="spTypeId">
          <el-select v-model="form.spTypeId" size="medium" clearable  placeholder="请选择商品分类级别" :disabled="true">
            <el-option
              v-for="item in jibie"
              :key="item.spTypeId"
              :label="item.kindName"
              :value="item.spTypeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 供应商 -->
        <el-form-item label="供应商" prop="gysId">
          <el-select v-model="form.gysId" size="medium" clearable  placeholder="请选择供应商":disabled="true">
            <el-option
              v-for="item in gys"
              :key="item.gysId"
              :label="item.gysName"
              :value="item.gysId">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 商户 -->
        <el-form-item label="商户" prop="sHId">
          <el-select v-model="form.sHId" size="medium" clearable  placeholder="请选择商户" :disabled="true">
            <el-option
              v-for="item in sh"
              :key="item.shid"
              :label="item.shangHuName"
              :value="item.shid">
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
          iphone:"",
          sHId:"",
          goodsName:"",
          price:"",
          purchasePrice:"",
          spTypeId:"",

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
        this.$axios.post("/showAllSp.action").then(function (response){
          _this.jibie=response.data;
        });
        this.$axios.post("/showAllGys.action").then(function (response){
          _this.gys=response.data;
        });
        this.$axios.post("/showAllSh.action").then(function (response){
          _this.sh=response.data;
        });
        this.$axios.post("/queryByidTenan.action?id="+id).then(function (response) {
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
