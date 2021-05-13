<template>
<div id="app">
  <el-container style="margin-top: -10px;margin-left: -10px">
  <el-header>
    <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
      <el-menu-item style="margin-top: -18px">
        <h1>商品资料维护 > 商品分类信息维护</h1>
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
  </el-header>
  <el-main>
    <div style="margin-top: 0px;left: -500px">
      <el-input
        placeholder="输入商品分类名称"
        v-model="input"
        clearable style="width: 250px"
        id="goodsName"
      >
      </el-input>
      <el-button type="success" plain @click="getQuery()">查询</el-button>
      <el-button  style="margin-left: 800px" type="info" @click="addDialogVisible=true">添加</el-button>
    </div>

  <el-card style="margin-top: 50px">
<!--    展示表格数据-->
    <el-table :data="cationData" border style="width: 100%" >
      <el-table-column prop="spTypeId" label="分类ID" width="180"></el-table-column>
      <el-table-column prop="kindid" label="分类编号" width="180" ></el-table-column>
      <el-table-column prop="kindName" label="分类名称"></el-table-column>
      <el-table-column prop="kindjibie" label="分类级别"></el-table-column>
      <el-table-column prop="Kind_Stat" label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button round type="primary" icon="el-icon-edit" size="mini"
                     @click="showEditDialog(scope.row.spTypeId)">修改</el-button>
          <!-- 删除 -->
          <el-button round type="danger" icon="el-icon-delete" size="mini"
                     @click="deleteEmpInfo(scope.row.spTypeId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页：:current-page 当前页码 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 30, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
    <!--添加分类对话框-->
<el-dialog title="添加分类信息" :visible.sync="addDialogVisible" @close="addDialogClosed" width="50%">
<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
  <!-- 分类编号 -->
  <el-form-item label="分类编号" prop="kindid">
    <el-input v-model="addForm.kindid"></el-input>
  </el-form-item>
  <!-- 分类名称 -->
  <el-form-item label="分类名称" prop="kindName">
    <el-input v-model="addForm.kindName"></el-input>
  </el-form-item>
  <!-- 分类级别 -->
  <el-form-item label="分类级别" prop="kindjibie">
    <el-input v-model="addForm.kindjibie"></el-input>
  </el-form-item>
</el-form>
  <!-- 内容底部区域 -->
  <span slot="footer" class="dialog-footer">
   <el-button type="primary" @click="addEmp">添 加</el-button>
   <el-button @click="addDialogVisible = false">取 消</el-button>
  </span>
</el-dialog>


    <!-- 修改用户对话框 -->
    <el-dialog title="修改分类信息" :visible.sync="editDialogVisible" width="50%" @colse="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <!-- 分类ID -->
        <el-form-item label="分类ID" prop="spTypeId">
          <el-input v-model="editForm.spTypeId" :disabled="true"></el-input>
        </el-form-item>
        <!-- 分类编号 -->
        <el-form-item label="分类编号" prop="kindid">
          <el-input v-model="editForm.kindid"></el-input>
        </el-form-item>
        <!-- 分类名称 -->
        <el-form-item label="分类名称" prop="kindName">
          <el-input v-model="editForm.kindName"></el-input>
        </el-form-item>
        <!-- 分类级别 -->
        <el-form-item label="分类级别" prop="kindjibie">
          <el-input v-model="editForm.kindjibie"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editEmpInfo">保 存</el-button>
        <el-button @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
  import axios from "axios";

  export default {
    name: "commodity",
    data() {
      return {
        pageno: 1,
        pagesize:5,
        total:0,
          cationData: [
          ],
          input: '',
// ============================添加分类信息==================
        addDialogVisible: false,// 添加数据对话框：false 隐藏 true 显示
        // 添加分类表单项 请求参数
        addForm: {},
        // 添加时/(修改时也可复用)查询所有的部门
        DepartmentList: [],
        // 添加数据对话框验证规则
        addFormRules: {
          kindid: [
            {required: true, message: "分类信息不能为空", trigger: "blur"}
          ],
          kindName: [
            {required: true, message: "工资不能为空", trigger: "blur"},
          ],
          kindjibie: [
            {required: true, message: "年龄不能为空", trigger: "blur"},
          ]
        },
        // =====================修改分类信息==============================
        // 控制修改对话框显示true/隐藏false
        editDialogVisible: false,
        // 修改分类信息
        editForm: {},
        // 修改分类表单验证规则
        editFormRules: {
          // name: [
          //     {required: true, message: "分类姓名不能为空", trigger: "blur"}
          // ],
          // salary: [
          //     {required: true, message: "工资不能为空", trigger: "blur"},
          //     {min: 0, max: 10, message: "长度在 1 ~ 10 个字符", trigger: "blur"}
          // ],
          // age: [
          //     {required: true, message: "年龄不能为空", trigger: "blur"},
          //     {min: 1, max: 3, message: "长度在 1 ~ 3 个字符", trigger: "blur"}
          // ]
        },
      }
    },
    //vue生命周期函数，页面创建时执行
    created() {
      // this.getLoginUser();
      //this.getEmpList();
      //查询所有的部门信息(添加分类)
      //this.findDepList();
      this.getdata();
    },
    methods: {
      getQuery(){
        var _this =this;
        //加参数
        var params = new URLSearchParams();
        params.append("pageno",this.pageno); //分页
        params.append("pagesize",this.pagesize);
        params.append("KindName",document.getElementById("goodsName").value)
        this.$axios.post("show.action",params).then(function (response) {
          _this.cationData=response.data.records;
          _this.total = response.data.total;
        }).catch();
      },
      getdata(){
        var _this =this;
        //加参数
        var params = new URLSearchParams();
        params.append("pageno",this.pageno); //分页
        params.append("pagesize",this.pagesize);
        //params.append("KindName",document.getElementById("goodsName").value)
        this.$axios.post("show.action",params).then(function (response) {
          _this.cationData=response.data.records;
          _this.total = response.data.total;
        }).catch();
      },
      //模糊查询

      // 获取登录后存入 localStorage 中的 user
      getLoginUser() {
        // 根据 k 拿到登录时存入 localStorage 的 user（json字符串）
        let userJSONString = localStorage.getItem("user");
        if (userJSONString != null) {
          // 将json字符串转化为对象
          let userDB = JSON.parse(userJSONString);
          console.log("存入localStorage中的user对象：", userDB);
          this.user = userDB;
        } else {
          // this.$message("尚未登录，请先登录！！！");
          alert("尚未登录，请先登录！！！");
          location.href = './login.html';
        }
      },
      // 监听pageSize页面大小改变的事件
      handleSizeChange(newSize) {
        this.pagesize = newSize;
        this.getdata();// 页面大小发生改变重新请求数据
      },
      // 监听page当前页改变的事件
      handleCurrentChange(newPage) {
        this.pageno = newPage;
        this.getdata(); // page当前页发生改变重新申请数据
      },

      // ============================添加分类信息==================
      addDialogClosed() {
        this.$refs.addFormRef.resetFields();// 重置表单项
      },
      // 添加分类信息
      addEmp() {
        var _this=this;
        var params = new URLSearchParams();
        Object.keys(this.addForm).forEach(function (key){
          params.append(key,_this.addForm[key]);
        })
        this.$axios.post("/addGoods.action",params).then(res => {
            _this.$message.success("添加成功!");
            // 隐藏对话框
            _this.addDialogVisible = false;
            _this.getdata() // 数据发生改变重新请求数据
        })
      },
      // ===================添加分类数据结束=================
      // ====删除按钮====
       deleteEmpInfo(id) {
         var _this=this;
       if (confirm("此操作将永久删除该条数据, 是否继续?")){
          this.$axios.post("/deleteGoods.action?id="+id).then(
            function (response){
              _this.$message.success("删除成功！")
              _this.getdata();
            }
          ).catch()
       }

      },
      // ====删除方法结束======================

      // =======根据id查询要修改的分类信息：点击修改，展示修改框
      // scope.row.id拿到要修改数据的id==========
      showEditDialog(id) {
        var _this =this;
        this.$axios.post("/queryById.action?id="+id).then(function (response) {
          _this.editForm=response.data;
        }).catch()
        this.editDialogVisible = true;  //显示修改卡片
      },
      // 关闭修改窗口
      editDialogClosed() {
        this.$refs.editFormRef.resetFields();
      },
      // 修改分类信息
      editEmpInfo() {
        // this.$refs.editFormRef.validate(async valid => {
        //   if (!valid) return;
        //   const {data: res} = await this.$axios.post("/updateByGoods.action", this.editForm);
        //   console.log("后端返回的res：", res);
        //   if (res > 0) {
        //     this.$message.success("修改成功！！！");
        //     //隐藏修改框
        //     this.editDialogVisible = false;
        //     this.getEmpList();
        //   } else {
        //     this.$message.error("修改失败！");
        //   }
        // });
        var _this=this;
        var params = new URLSearchParams();
        Object.keys(this.editForm).forEach(function (key){
          params.append(key,_this.editForm[key]);
        })
        this.$axios.post("/updateByGoods.action",params).then(
          function (response){
              _this.$message.success("修改成功！");
              //隐藏修改框
              _this.editDialogVisible = false;
              _this.getdata();
          }
        ).catch()

      }
    }
  }
</script>

<style scoped>

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


</style>
