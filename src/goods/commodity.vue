<template>
<div id="app">
  <el-container style="margin-top: -10px;margin-left: -10px">
  <el-header>
    <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
      <el-menu-item style="margin-top: -18px">
        <h1>商品资料维护>商品分类信息维护</h1>
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
  </el-header>
  <el-main>
    <div></div>
    <div>
      <span>根据条件查询分类信息：</span>
      <input></input>
      <el-button type="success" plain>查询</el-button>
    </div>
    <el-table
      :data="cationData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="spTypeId"
        label="分类ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="kind_id"
        label="分类编号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="Kind_Name"
        label="分类名称"
      >
      </el-table-column>
      <el-table-column
        prop="Kind_jibie"
        label="分类级别">
      </el-table-column>
      <el-table-column
        prop="Kind_jibie"
        label="操作">
      </el-table-column>
    </el-table>

  </el-main>
  </el-container>
</div>
</template>

<script>
  export default {
    name: "commodity",
    data() {
      return {
        cationData: [
          {
            spTypeId: '2016-05-03',
            kind_id: '王小虎',
            Kind_Name: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    }
  }
</script>

<style scoped>
.el-table{

}
</style>
