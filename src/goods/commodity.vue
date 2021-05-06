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
    <div style="margin-top: -55px;left: -500px">
      <el-input
        placeholder="输入分类编号或分类名称"
        v-model="input"
        clearable style="width: 250px">
      </el-input>
      <el-button type="success" plain>查询</el-button>
      <el-button type="danger" @click="isadduserwin=true">添加</el-button>
    </div>
<div>
  <el-card style="margin-top: -40px">
<!--    展示表格数据-->
    <el-table :data="cationData" border style="width: 100%">
      <el-table-column prop="spTypeId" label="分类ID" width="180"></el-table-column>
      <el-table-column prop="kind_id" label="分类编号" width="180" ></el-table-column>
      <el-table-column prop="Kind_Name" label="分类名称"></el-table-column>
      <el-table-column prop="Kind_jibie" label="分类级别"></el-table-column>
      <el-table-column prop="Kind_Stat" label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button type="primary" icon="el-icon-edit" size="mini"
                     @click="showEditDialog(scope.row.id)">修改</el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" size="mini"
                     @click="deleteEmpInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页：:current-page 当前页码 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
    </el-pagination>
  </el-card>

  <!--添加数据对话框结束-->

</div>

  </el-main>
  </el-container>

</div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
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
          ],
          input: '',



      }
    }
  }


</script>

<style scoped>
.el-table{

}
</style>
<style>
  /*全局样式 */
  body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  /* 卡片区域 */
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 8, 10, 0.15);
  }
  /* 表格样式 */
  .el-table {
    margin-top: 15px;
    font-size: 15px;
    min-width: 350px;
  }
  .el-table-column{
    max-height: 30px;
  }

  /*头样式*/
  .el-header {
    display: flex;
    justify-content: space-between;
    /*左右分布 padding-left: 0;*/
    /*logo图片距左为0 align-items: center;*/
    /*水平居中 color: #fff;*/
    /*文字颜色 font-size: 20 px;*/
  }
</style>
