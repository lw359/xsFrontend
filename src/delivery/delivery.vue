<template>
  <div>
    <el-input placeholder="请输入内容" v-model="empName" class="input-with-select">
      <el-button slot="append" @click="cx" icon="el-icon-search"></el-button>
    </el-input>
  <el-table
    :data="tableData"
    style="width: 100%;margin-top: 50px">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="配送员名称">
            <span>{{ props.row.empname }}</span>
          </el-form-item>
          <el-form-item label="配送员工号">
            <span>{{ props.row.empno}}</span>
          </el-form-item>
          <el-form-item label="配送员性别">
            <span>{{ props.row.empsex }}</span>
          </el-form-item>
          <el-form-item label="员工id">
            <span>{{ props.row.depid }}</span>
          </el-form-item>
          <el-form-item label="入职日期">
            <span>{{ props.row.empworktime }}</span>
          </el-form-item>
          <el-form-item label="员工职务">
            <span>{{ props.row.empwork }}</span>
          </el-form-item>
          <el-form-item label="员工类型">
            <span>{{ props.row.usertype }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="配送员名称"
      prop="empname">
    </el-table-column>
    <el-table-column
      label="配送员编号"
      prop="empno">
    </el-table-column>
    <el-table-column
      label="配送员状态"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.start=='0'">空闲</span>
        <span v-if="scope.row.start=='1'">正在配送</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
     >
      <template>
        <el-button  @click="peisong">配送</el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
<!--模态框-->
    <el-dialog title="配送详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="ddType" label="订单状态"></el-table-column>
        <el-table-column property="shangHuName" label="商户名称"></el-table-column>
        <el-table-column property="phone" label="用户电话"></el-table-column>
        <el-table-column property="shphone" label="商户电话"></el-table-column>
        <el-table-column property="menDianAdrss" label="商户门店地址"></el-table-column>
        <el-table-column property="spid" label="商品编号"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="pagesize1"
        layout="total1, sizes, prev, pager, next, jumper"
        :total="total1">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
    export default {
        name: "delivery",
      data(){
          return {
            pageno1:1,
            pagesize1:3,
            pageno:1,
            pagesize:3,
            total:0,
            total1:0,
            tableData: [],
            gridData:[],
            empName:"",
            dialogTableVisible: false,
            dialogFormVisible: false,

          }
      },
      methods:{
          //模糊查询
          cx(){
              this.getdata()
          },
        //员工分页
          getdata:function () {
            var _this = this;
            var params = new URLSearchParams();
            params.append("pageno", this.pageno);
            params.append("pagesize", 3);
            params.append("empname",this.empName)
            this.$axios.post("selectAllYg.action",params).then(function (response) {
              _this.tableData = response.data.records;
              _this.total1 = response.data.total1;
              // console.log(_this.tableData)
            }).catch();
          },
        handleSizeChange(newSize) {
          this.pagesize=newSize
          this.getdata();// 页面大小发生改变重新请求数据
        },
        handleSizeChange1(newSize){
          this.pagesize = newSize;
          this.peisong();
        },
        // 监听page当前页改变的事件
        handleCurrentChange(newPage) {
          this.pageno = newPage;
          this.getdata(); // page当前页发生改变重新申请数据
        },
        handleCurrentChange1(newPage){
          this.pageno = newPage;
          this.peisong();
        },
        //模态框
        peisong(){
          this.dialogTableVisible = true
          var _this = this;
          var params = new URLSearchParams();
          params.append("pagesize1", this.pagesize1);
          params.append("pageno1", this.pageno1); //分页
          this.$axios.post("selectAllXq.action", params).then(function (response) {
            _this.gridData = response.data.records;
            _this.total1 = response.data.total1;
              }
          ).catch()
        }

        },
      created() {
        this.getdata();
      }
    }
</script>

<style scoped>

</style>
