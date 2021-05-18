<template>
<!-- 表格-->
  <div>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" :data="cgData" style="margin-top: 30px">
    <el-form-item label="采购员名称" prop="name">
<!--      <el-input v-model="ruleForm.name" ></el-input>-->
      <el-select v-model="ruleForm.name" @change="selectChange" style="width: 1160px" placeholder="请选择">
        <el-option
          v-for="items in cgData"
          :key="items.uid"
          :label="items.empname"
          :value="items.uid"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="采购员编号">
      <el-input v-model="ruleForm.region" id="pnbh"></el-input>
    </el-form-item>
    <el-form-item label="商品表格" v-model="ruleForm.spTable">
      <el-button style="margin-left: 950px" type="primary" @click="showDialog()" >添加商品</el-button>
    <br><br>

    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%"
      >
      <el-table-column
        prop="goodsName"
        label="商品名称"
        width="170">
      </el-table-column>
      <el-table-column
        prop="purchasePrice"
        label="进价"
        width="170">
      </el-table-column>
      <el-table-column
        prop="img"
        label="图片"
        width="170">
      </el-table-column>
      <el-table-column
        prop="stock"
        label="库存"
        width="170">
      </el-table-column>
      <el-table-column label="采购数量" width="170" v-model="ruleForm.cgsl">
        <template slot-scope="scope">
          <el-input-number size="mini" v-model="num" @change="handleChange(scope.row)" :min="1" :max="10" label="描述文字"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="170px"   v-model="ruleForm.zj" >
        <template>
        ￥<span>{{ruleForm.zj}}</span>
        </template>
      </el-table-column>

        <el-table-column label="编辑" width="142">
          <template slot-scope="scope">
          <el-button icon="el-icon-delete-solid" type="danger" @click="sc(tableData.spid)">移除</el-button>
          </template>
      </el-table-column>
    //商品采购表格
    </el-table>
    </el-form-item>
    <el-form-item label="填写时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()" style="margin-left: 800px;margin-top: 50px">提交</el-button>
      <el-button >返回</el-button>
    </el-form-item>
  </el-form>

<!--  模态框-->
    <el-dialog :visible.sync="dialogTableVisible"   title="添加商品">
<!--      <el-input></el-input><el-button>搜索</el-button>-->
      <el-table :data="gridData" ref = "multipleTable">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="商品名称" width="150" prop="goodsName" v-model="form.goodsName"></el-table-column>
        <el-table-column  label="库存数量" width="200" prop="stock" v-model="form.stock"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="primary" @click="tjsp(scope.row)">添加库存</el-button>
          </template>
        </el-table-column>
      </el-table>
<!-- //分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
      <el-button type="success" @click="dx()" style="margin-left: 310px">确认选择</el-button>
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
      name: "Purchase",
      data() {
        return {
          num: 1,
          pageno: 1,
          pagesize: 3,
          total: 0,
          ruleForm: {
            name: "",
            region: "",
            spTable: "",
            cgsl: "",
            date1: "",
            date2: "",
            zj: ""
          },
          zj:0,
          na: [],
          tableData: [],
          shuzu:[],
          //员工对象
          cgData: [],
          kaishi: 0,
          //商品对象
          gridData: [],
          dialogTableVisible: false,
          form: {
            goodsName: "",
            stock: "",
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          formLabelWidth: '120px'
          // hh:[{name:"呼呼",id:"1"},{name:"大苏打",id:"2"}]
        }
      },
      methods: {
        //计数器
        handleChange(value) {
          this.zj=value.purchasePrice * this.num
        },
        //移除商品
        sc(id) {
          this.$confirm('此操作将移除该商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.tableData.some((item, i) => {			//数组tableData（）方法中，返回true，就终止这个数组的后续循环
              if (item.id == id) {
                this.tableData.splice(i, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                return true;
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',

            })
          })
        },
        handleSizeChange(newSize) {
          this.pagesize = newSize;
          this.showDialog();// 页面大小发生改变重新请求数据
        },
        // 监听page当前页改变的事件
        handleCurrentChange(newPage) {
          this.pageno = newPage;
          this.showDialog(); // page当前页发生改变重新申请数据
        },
        //模态框
        showDialog() {
          this.dialogTableVisible = true
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno); //分页
          params.append("pagesize", this.pagesize);
          this.$axios.post("spSelect.cation", params).then(function (response) {
            _this.gridData = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        //模态框确认选择(记得返回做判断处理)
        dx() {
          this.dialogTableVisible = false
          // if(this.checked=true){
          var _this = this;
          this.$refs.multipleTable.selection.forEach(function (item) {
            _this.tableData.push(item)
            // console.log(item.purchasePrice * _this.num)
            _this.zj =item.purchasePrice*_this.num;
          })

          // }else{
          //   alert("请选择")
          // }
          // console.log(selection);
          /*     this.tableData.push(this.$refs.multipleTable.selection)
          console.log(this.$refs.multipleTable.selection);*/

        },
        tjsp(e) {
          console.log(e.purchasePrice*this.num)

          this.tableData.push(e);
          //
          // this.dialogTableVisible = false
          this.shuzu=e;
          this.shuzu.purchasePrice*this.num;
          this.ruleForm.zj = e.purchasePrice*this.num;
          console.log(this.shuzu.purchasePrice*this.num)
        },
        // 提交
        submitForm:function (form) {

          // this.$refs[formName].validate((valid) => {
          //   if (valid) {
          //     console.log(JSON.stringify(this.$refs[formName].validate((valid))))
          //     alert(this.$refs[formName].validate((valid)));
          //   } else {
          //     console.log('error submit!!');
          //     return false;
          //   }
          // });
          // console.log(formName)
        },
        //查询商品表
        getdata: function () {
          var _this = this;
          var params = new URLSearchParams();
          params.append("strat", this.kaishi);
          this.$axios.post("purchaseByid.action", params).then(function (response) {
            _this.cgData = response.data;
          }).catch();
        },
        //根据查询名称获取到对应员工的编号
        selectChange(val) {
          alert(val)
          var nary = this.cgData.find((item, index) => item.id = val);
          this.ruleForm.region = nary.empno;
          console.log(nary)
        }
      },
        created() {
          this.getdata();
        }
    }
</script>


