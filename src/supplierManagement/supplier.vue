<template>
  <div id="app">
    <el-container style="margin-top: -10px;margin-left: -10px">
      <el-header>
        <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
          <el-menu-item style="margin-top: -18px">
            <h1>供应商管理 > 供应商信息审核</h1>
          </el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main>
        <div style="margin-top: 0px;left: -500px">
          <el-input
            placeholder="输入供应商名称"
            v-model="input"
            clearable style="width: 250px"
            id="goodsName"
          >
          </el-input>
          <el-button  type="success" plain @click="getQuery()">查询</el-button>
<!--          <el-button style="margin-left: 800px" type="danger" @click="addDialog"  >添加</el-button>-->
        </div>
        <div>

        </div>
        <el-card style="margin-top: 50px">
          <!--    展示表格数据-->
          <el-table :data="cationData" border style="width: 100%" >
            <el-table-column prop="supId" label="供应商编号" width="150">
              <template slot-scope="scope">
                <router-link :to="{path:'/supplierDetails',query:{id:scope.row.gysId}}" class="a" >
                  {{ scope.row.supId }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="gysName" label="供应商名称"  ></el-table-column>
            <el-table-column prop="supName" label="联系人"  ></el-table-column>
            <el-table-column prop="auditState" label="审核状态">
              <template slot-scope="scope">
              <span v-if="scope.row.auditState=='G-001'">未审核</span>
              <span v-if="scope.row.auditState=='G-002'">审核通过</span>
              <span v-if="scope.row.auditState=='G-003'">审核不通过</span>
              </template>
            </el-table-column>
            <el-table-column prop="Stat" label="操作">
              <template slot-scope="scope">
                <!-- 修改 -->
                <el-button round type="danger" icon="el-icon-edit" size="mini"
                           v-if="scope.row.auditState=='G-001'"
                           @click="showEditDialog(scope.row.gysId)">审核</el-button>
                <el-button round type="primary"size="mini"
                           v-if="scope.row.auditState=='G-002'"
                           >已审核</el-button>
                <el-button round type="success" icon="el-icon-edit" size="mini"
                           v-if="scope.row.auditState=='G-003'"
                           @click="showEditDialog(scope.row.gysId)">重新审核</el-button>
                <!-- 删除 -->
<!--                <el-button type="danger" icon="el-icon-delete" size="mini"-->
<!--                           @click="deleteEmpInfo(scope.row.supId)">删除</el-button>-->
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
        <el-dialog  title="添加用户信息" :visible.sync="addDialogVisible" @close="addDialogClosed" width="50%">
          <el-form  :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
            <!-- 用户名称 -->
            <el-form-item label="用户名" prop="username" >
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <!-- 电话 -->
            <el-form-item label="电话" prop="iPhone">
              <el-input v-model="addForm.iPhone"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <!-- 照片 -->
            <el-form-item label="头像" prop="photo">
              <input type="file" @change="getFileImage($event)">
            </el-form-item>
          </el-form>
          <!-- 内容底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addEmpSp">添 加</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>


        <!-- 修改用户对话框 -->
        <el-dialog title="审核供应商信息" :visible.sync="editDialogVisible" width="50%" @colse="editDialogClosed">
          <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
            <!-- ID -->
            <el-form-item label="ID" prop="gysId" >
              <el-input v-model="editForm.gysId" :disabled="true"></el-input>
            </el-form-item>
            <!-- 供应商编号 -->
            <el-form-item label="供应商编号" prop="supId" >
              <el-input v-model="editForm.supId" ></el-input>
            </el-form-item>
            <!-- 供应商名称 -->
            <el-form-item label="供应商名称" prop="gysName" >
              <el-input v-model="editForm.gysName"></el-input>
            </el-form-item>
            <!-- 电话号码 -->
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="editForm.phone"></el-input>
            </el-form-item>
            <!-- 联系人 -->
            <el-form-item label="联系人" prop="supName">
              <el-input v-model="editForm.supName"></el-input>
            </el-form-item>
            <!-- 联系电话 -->
            <el-form-item label="联系电话" prop="supPhone">
              <el-input v-model="editForm.supPhone"></el-input>
            </el-form-item>
            <!-- 联系地址 -->
            <el-form-item label="联系地址" prop="supAddress">
              <el-input v-model="editForm.supAddress"></el-input>
            </el-form-item>
            <!-- 审核状态 -->
            <el-form-item label="审核状态" prop="auditState">
              <el-select v-model="editForm.auditState" size="medium" clearable  placeholder="请选择状态">
                <el-option
                  v-for="item in Stated"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
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
    name: "",
    data() {
      return {
        pageno: 1,
        pagesize:5,
        total:0,
        file:null,
        //存放展示信息
        cationData: [],
        input: '',
        //存放状态
        Stated:[
          {id:"G-001",name:"未审核"},
          {id:"G-002",name:"审核通过"},
          {id:"G-003",name:"审核不通过"}
    ],
// ============================添加分类信息==================
        addDialogVisible: false,// 添加数据对话框：false 隐藏 true 显示
        // 添加分类表单项 请求参数
        addForm: {
          iPhone: ""
        },
        // 添加时/(修改时也可复用)查询所有的部门
        DepartmentList: [],
        // 添加数据对话框验证规则
        addFormRules: {
          username:[
            {required: true, message: "用户名不能为空", trigger: "blur"}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur"},
          ],
          iPhone: [
            {required: true, message: "电话号码不能为空", trigger: "blur"},
          ],
          email: [
            {required: true, message: "邮箱不能为空", trigger: "blur"},
          ]
        },
        // =====================修改分类信息==============================
        // 控制修改对话框显示true/隐藏false
        editDialogVisible: false,
        // 修改分类信息
        editForm: {
          auditState: ""
        },
        // 修改分类表单验证规则
        editFormRules: {
          supId: [
              {required: true, message: "供应商编号不能为空", trigger: "blur"}
          ],
          gysName: [
              {required: true, message: "供应商名称不能为空", trigger: "blur"},
          ],
          phone: [
              {required: true, message: "电话不能为空", trigger: "blur"},
          ],
          supName: [
            {required: true, message: "联系人不能为空", trigger: "blur"},
          ],
          supPhone: [
            {required: true, message: "联系电话不能为空", trigger: "blur"},
          ],
          supAddress: [
            {required: true, message: "联系地址不能为空", trigger: "blur"},
          ]
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
        //分页
        params.append("pageno",this.pageno);
        params.append("pagesize",this.pagesize);
        params.append("name",document.getElementById("goodsName").value)
        this.$axios.post("/showByIdSupp.action",params).then(function (response) {
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
        this.$axios.post("/showAllSup.action",params).then(function (response) {
          _this.cationData=response.data.records;
          _this.total = response.data.total;
        }).catch();
      },
      //跳转界面拿id
      ShowId(id){
        this.$router.push({path:"/supplierDetails",query: {id:id}});
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
      //存放图片文件路径
      getFileImage(event){
        this.file = event.target.files[0];
      },
      //展示下拉框数据
      addDialog(){
        this.addDialogVisible=true;
      },
      // 添加商品信息
      addEmpSp() {
        var _this=this;
        var params = new URLSearchParams();
        params.append("username",this.addForm.username);
        params.append("password",this.addForm.password);
        params.append("iPhone",this.addForm.iPhone);
        params.append("email",this.addForm.email);
        params.append("status","U-001");
        params.append("img",_this.file.name);
        this.$axios.post("/addTenanUsers.action",params).then(res => {
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
          this.$axios.post("/deleteTenanceUser.action?id="+id).then(
            function (response){
              _this.$message.success("删除成功！")
              _this.getdata();
            }
          ).catch()
        }
      },
      // ====删除方法结束======================

      // =======根据id查询要修改的分类信息：点击修改，展示修改框
      showEditDialog(id) {
        var _this =this;
        this.$axios.post("/queryByidSupplier.action?id="+id).then(function (response) {
          console.log(response.data)
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
        var _this=this;
        var params = new URLSearchParams();
        params.append("gysId",this.editForm.gysId);
        params.append("supId",this.editForm.supId);
        params.append("gysName",this.editForm.gysName);
        params.append("phone",this.editForm.phone);
        params.append("supName",this.editForm.supName);
        params.append("supPhone",this.editForm.supPhone);
        params.append("supAddress",this.editForm.supAddress);
        params.append("auditState",this.editForm.auditState)
        this.$axios.post("/updateSupplier.action",params).then(
          function (response){
           if(response.data>0){
             _this.$message.success("状态修订成功！");
             //隐藏修改框
             _this.editDialogVisible = false;
             _this.getdata();
           }else{
             _this.$message.success("状态修订失败！");
           }
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
