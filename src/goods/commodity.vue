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
    <div style="margin-top: -55px;left: -500px">
      <el-input
        placeholder="输入分类编号或分类名称"
        v-model="input"
        clearable style="width: 250px">
      </el-input>
      <el-button type="success" plain @click="">查询</el-button>
      <el-button style="margin-left: 800px" type="danger" @click="addDialogVisible=true">添加</el-button>
    </div>

  <el-card style="margin-top: -40px">
<!--    展示表格数据-->
    <el-table :data="cationData" border style="width: 100%" >
      <el-table-column prop="spTypeId" label="分类ID" width="180"></el-table-column>
      <el-table-column prop="kindid" label="分类编号" width="180" ></el-table-column>
      <el-table-column prop="kindName" label="分类名称"></el-table-column>
      <el-table-column prop="kindjibie" label="分类级别"></el-table-column>
      <el-table-column prop="Kind_Stat" label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button type="primary" icon="el-icon-edit" size="mini"
                     @click="showEditDialog(scope.row.spTypeId)">修改</el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" size="mini"
                     @click="deleteEmpInfo(scope.row.spTypeId)">删除</el-button>
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
      :total="total">
    </el-pagination>
  </el-card>
    <!--添加员工对话框-->
<el-dialog title="添加分类信息" :visible.sync="addDialogVisible" @close="addDialogClosed" width="50%">
<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
  <!-- 姓名 -->
  <el-form-item label="姓名" prop="name">
    <el-input v-model="addForm.name"></el-input>
  </el-form-item>
  <!-- 工资 -->
  <el-form-item label="工资" prop="salary">
    <el-input v-model="addForm.salary"></el-input>
  </el-form-item>
  <!-- 年龄 -->
  <el-form-item label="年龄" prop="age">
    <el-input v-model="addForm.age"></el-input>
  </el-form-item>
  <!--员工所属部门-->
  <el-select v-model="addForm.departmentId" size="medium" placeholder="请选择分类级别">
    <el-option
      v-for="item in DepartmentList"
      :key="item.id"
      :label="item.d_name"
      :value="item.id">
    </el-option>
  </el-select>
</el-form>
  <!-- 内容底部区域 -->
  <span slot="footer" class="dialog-footer">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addEmp">确 定</el-button>
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
        <el-form-item label="分类名称" prop="KindName">
          <el-input v-model="editForm.kindName"></el-input>
        </el-form-item>
        <!-- 分类级别 -->
        <el-form-item label="分类级别" prop="Kindjibie">
          <el-input v-model="editForm.kindjibie"></el-input>
        </el-form-item>
<!--        &lt;!&ndash;员工所属部门&ndash;&gt;-->
<!--        <el-select v-model="editForm.d_id" size="medium" placeholder="请选择员工所属部门">-->
<!--          <el-option-->
<!--            v-for="item in DepartmentList"-->
<!--            :key="item.id"-->
<!--            :label="item.d_name"-->
<!--            :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
                        <el-button @click="editDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editEmpInfo">确 定</el-button>
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
        total:0,
          cationData: [
          ],
          input: '',
// ============================添加员工信息==================
        addDialogVisible: false,// 添加数据对话框：false 隐藏 true 显示
        // 添加员工表单项 请求参数
        addForm: {},
        // 添加时/(修改时也可复用)查询所有的部门
        DepartmentList: [],
        // 添加数据对话框验证规则
        addFormRules: {
          name: [
            {required: true, message: "员工姓名不能为空", trigger: "blur"}
          ],
          salary: [
            {required: true, message: "工资不能为空", trigger: "blur"},
            {min: 0, max: 10, message: "长度在 1 ~ 10 个字符", trigger: "blur"}
          ],
          age: [
            {required: true, message: "年龄不能为空", trigger: "blur"},
            {min: 1, max: 3, message: "长度在 1 ~ 3 个字符", trigger: "blur"}
          ]
        },
        // =====================修改员工信息==============================
        // 控制修改对话框显示true/隐藏false
        editDialogVisible: false,
        // 修改员工信息
        editForm: {},
        // 修改员工表单验证规则
        editFormRules: {
          // name: [
          //     {required: true, message: "员工姓名不能为空", trigger: "blur"}
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
      //查询所有的部门信息(添加员工)
      //this.findDepList();
      this.getdata();
    },
    methods: {
      getdata(){
        var _this =this;
        //加参数
        var params = new URLSearchParams();
        // params.append("mid",this.selval);  //查询条件
        params.append("pageno",this.pageno); //分页
        params.append("pagesize",5);
        this.$axios.post("show.action",params).then(function (response) {
          _this.cationData=response.data.records;
          _this.total = response.data.total;
        }).catch();
      },
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
      // 获得所有员工信息
      async getEmpList() {
        const {data: res} = await $http.get("/findAllEmp?name=" +
          this.findAllEmpParam.name + "&page=" + this.findAllEmpParam.page + "&pageSize=" + this.findAllEmpParam.pageSize
        );
        console.log("后端返回的员工列表数据：", res);
        if (res != null) {
          this.empList = res.empList;
          this.totals = res.empCounts;
          // this.$message.success("查询成功！");
        } else {
          this.$message.error("员工信息获取失败！");
        }
      },
      // 监听pageSize页面大小改变的事件
      handleSizeChange(newSize) {
        this.findAllEmpParam.pageSize = newSize;
        console.log("每页多少条数据：", newSize);
        this.getEmpList(); // 页面大小发生改变重新请求数据
        this.$message.success("查询成功！");
      },
      // 监听page当前页改变的事件
      handleCurrentChange(newPage) {
        console.log("当前页码：", newPage);
        this.findAllEmpParam.page = newPage;
        this.getEmpList(); // page当前页发生改变重新申请数据
      },

      // ============================添加员工信息==================
      //查询所有部门信息
      async findDepList() {
        const {data: res} = await $http.get("/findDepList");
        console.log("后端返回的部门列表数据：", res);
        if (res != null) {
          this.DepartmentList = res
        } else {
          this.$message.error("部门信息获取失败！");
        }
      },
      // 监听添加员工对话框（关闭）
      addDialogClosed() {
        this.$refs.addFormRef.resetFields();// 重置表单项
      },
      // 添加员工
      addEmp() {
        //文件上传时 请求方式必须是post ，enctype 必须为 multipart/form-data
        let formData = new FormData();  //模拟一个表单（用来给后端传递数据）
        formData.append("name", this.addForm.name);
        formData.append("salary", this.addForm.salary);
        formData.append("age", this.addForm.age);
        formData.append("d_id", this.addForm.departmentId);
        formData.append("photo", this.$refs.myfile.files[0]);
        axios({
          method: "post",
          url: "",
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log("后端返回的数据", res.data);
          if (res.data.state) {
            this.$message.success(res.data.msg);
            // 隐藏对话框
            this.addDialogVisible = false;
            this.getEmpList(); // 数据发生改变重新请求数据
          } else {
            this.$message.error("添加失败！");
          }
        })

      },
      // ===================添加员工数据结束=================
      //去到列表页面，并带上id
      toPlace(id) {
        //location.href = './placelist.html?id=' + id
      },
      // ====删除按钮====
       deleteEmpInfo(id) {
        // 弹框
        // const confirmResult = await this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).catch(err => err);
        // // 成功删除为confirm 取消为 cancel
        // if (confirmResult !== 'confirm') {
        //   return this.$message.info("已取消删除");
        // }
        // const {data: res} = await $http.get("/deleteEmp?id=" + id);
        // this.$message.success(res.msg);
        // this.getEmpList();
         this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示',{
           confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
         } )
      },
      // ====删除方法结束======================

      // =======根据id查询要修改的员工信息：点击修改，展示修改框
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
