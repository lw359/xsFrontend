<template>
  <div id="app">
    <el-container style="margin-top: -10px;margin-left: -10px">
      <el-header>
        <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
          <el-menu-item style="margin-top: -18px">
            <h1>员工管理 </h1>
          </el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main>
        <div style="margin-top: 0px;left: -500px">
          <el-input
            placeholder="输入员工名称"
            v-model="input"
            clearable style="width: 250px"
            id="name"
          >
          </el-input>
          <el-button type="success" plain @click="getQuery()">查询</el-button>
          <el-button style="margin-left: 800px" type="info" @click="addDialog">添加</el-button>
        </div>
        <div>

        </div>
        <el-card style="margin-top: 50px">
          <!--    展示表格数据-->
          <el-table :data="cationData" border style="width: 100%" >
            <el-table-column prop="uid" label="员工工号" width="150">
              <template slot-scope="scope">
                <router-link :to="{path:'/rolesDetails',query:{id:scope.row.uid}}" class="a" >
                  {{ scope.row.uid }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="empno" label="员工工号"  ></el-table-column>
            <el-table-column prop="empname" label="员工姓名"  ></el-table-column>
            <el-table-column prop="empsex" label="员工性别"  ></el-table-column>
            <el-table-column prop="phone" label="员工电话"  ></el-table-column>
            <el-table-column prop="email" label="员工邮箱"  ></el-table-column>
            <el-table-column prop="empwork" label="员工职务"  ></el-table-column>
            <el-table-column prop="empworktime" label="员工入职时间"  ></el-table-column>
            <el-table-column prop="department" label="所属部门"  ></el-table-column>
            <!--            <el-table-column prop="auditState" label="审核状态">-->
            <!--              <template slot-scope="scope">-->
            <!--                <span v-if="scope.row.auditState=='G-001'">未审核</span>-->
            <!--                <span v-if="scope.row.auditState=='G-002'">审核通过</span>-->
            <!--                <span v-if="scope.row.auditState=='G-003'">审核不通过</span>-->
            <!--              </template>-->
            <!--            </el-table-column>-->
            <el-table-column prop="Stat" label="操作">
              <template slot-scope="scope">
                <!-- 修改 -->
                <el-button round type="primary" icon="el-icon-edit" size="mini"
                           @click="showEditDialog(scope.row.uid)">修改</el-button>
                <!-- 删除 -->
                <el-button round type="danger" icon="el-icon-delete" size="mini"
                           @click="deleteEmpInfo(scope.row.uid)">删除</el-button>
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
        <el-dialog  title="添加员工信息" :visible.sync="addDialogVisible" @close="addDialogClosed" width="50%">
          <el-form  :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
            <!-- 员工编号 -->
            <!--            <el-form-item label="员工编号" prop="supId" >-->
            <!--              <el-input v-model="addForm.supId"></el-input>-->
            <!--            </el-form-item>-->
            '<!-- 员工工号 -->
            <el-form-item label="员工工号" prop="empno">
              <el-input v-model="addForm.empno"></el-input>
            </el-form-item>
            <!-- 员工名称 -->
            <el-form-item label="员工名称" prop="empname">
              <el-input v-model="addForm.empname"></el-input>
            </el-form-item>
            <!-- 员工性别 -->
            <el-form-item label="员工性别" prop="empsex">
              <el-input v-model="addForm.empsex"></el-input>
            </el-form-item>
<!--             员工出生日期 -->
<!--            <el-form-item label="员工出生日期" prop="empbirth">-->
<!--              <el-input v-model="addForm.empbirth"></el-input>-->
<!--            </el-form-item>-->
            <!-- 员工入职日期 -->
<!--            <el-form-item label="员工入职日期" prop="empworktime">-->
<!--              <el-input v-model="addForm.empworktime"></el-input>-->
<!--            </el-form-item>-->
            <!-- 员工职务 -->
            <el-form-item label="员工职务" prop="empwork">
              <el-input v-model="addForm.empwork"></el-input>
            </el-form-item>
            <!-- 所属部门 -->
            <el-form-item label="所属部门" prop="department">
              <el-input v-model="addForm.department"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <!-- 员工电话 -->
            <el-form-item label="员工电话" prop="phone">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <!-- 员工电话 -->
            <el-form-item label="员工邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>

            <!--            &lt;!&ndash; 审核状态 &ndash;&gt;-->
            <!--            <el-form-item label="审核状态" prop="auditState">-->
            <!--              <el-input v-model="addForm.auditState"></el-input>-->
            <!--            </el-form-item>-->
          </el-form>
          <!-- 内容底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addEmpSp">添 加</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>


        <!-- 修改用户对话框 -->
        <el-dialog title="修改员工信息" :visible.sync="editDialogVisible" width="50%" @colse="editDialogClosed">
          <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">

            <el-form-item label="员工工号" prop="empno">
              <el-input v-model="editForm.empno"></el-input>
            </el-form-item>
            <!-- 员工名称 -->
            <el-form-item label="员工名称" prop="empname">
              <el-input v-model="editForm.empname"></el-input>
            </el-form-item>
            <!-- 员工性别 -->
            <el-form-item label="员工性别" prop="empsex">
              <el-input v-model="editForm.empsex"></el-input>
            </el-form-item>
<!--             员工出生日期 -->
<!--                        <el-form-item label="员工出生日期" prop="empbirth">-->
<!--                          <el-input v-model="addForm.empbirth"></el-input>-->
<!--                        </el-form-item>-->
            <!-- 员工入职日期 -->
            <!--            <el-form-item label="员工入职日期" prop="empworktime">-->
            <!--              <el-input v-model="addForm.empworktime"></el-input>-->
            <!--            </el-form-item>-->
            <!-- 员工职务 -->
            <el-form-item label="员工职务" prop="empwork">
              <el-input v-model="editForm.empwork"></el-input>
            </el-form-item>
            <!-- 所属部门 -->
            <el-form-item label="所属部门" prop="department">
              <el-input v-model="editForm.department"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password" >
              <el-input v-model="editForm.password" show-password></el-input>
            </el-form-item>
            <!-- 员工电话 -->
            <el-form-item label="员工电话" prop="phone">
              <el-input v-model="editForm.phone"></el-input>
            </el-form-item>
            <!-- 员工电话 -->
            <el-form-item label="员工邮箱" prop="email">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <!-- 状态 -->
            <!--            <el-form-item label="状态" prop="tarState">-->
            <!--              <el-select v-model="editForm.tarState" size="medium" clearable  placeholder="请选择状态">-->
            <!--                <el-option-->
            <!--                  v-for="item in Stated"-->
            <!--                  :key="item.id"-->
            <!--                  :label="item.name"-->
            <!--                  :value="item.id">-->
            <!--                </el-option>-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->
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
        //存放状态
        Stated:[
          {id:"A-001",name:"可用"},
          {id:"A-002",name:"不可用"}
        ],
        //存放状态
        auditStated:[
          {id:"G-001",name:"未审核"},
        ],
        //存放展示信息
        cationData: [],
        input: '',
        //存放分类级别
        jibie:[],
        //存放员工
        gys:[],
        //存放商户
        sh:[],
// ============================添加分类信息==================
        addDialogVisible: false,// 添加数据对话框：false 隐藏 true 显示
        // 添加分类表单项 请求参数
        addForm: {
          empbirth:"",
          empworktime:"",
          empwork:"",
          department:"",
          empno:"",
          empsex:"",
          empname:""

        },
        // 添加时/(修改时也可复用)查询所有的部门
        DepartmentList: [],
        // 添加数据对话框验证规则
        addFormRules: {
          empno: [
            {required: true, message: "请输入员工工号", trigger: "blur"},
          ],
          empname: [
            {required: true, message: "请输入员工名称", trigger: "blur"}
          ],
          empsex: [
            {required: true, message: "请输入员工性别", trigger: "blur"},
          ],
          empwork: [
            {required: true, message: "请输入员工职务", trigger: "blur"}
          ],
          department: [
            {required: true, message: "请输入所属部门", trigger: "blur"},
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
          ],
          phone: [
            {required: true, message: "请输入员工电话", trigger: "blur"},
          ],
          email: [
            {required: true, message: "请输入员工邮箱", trigger: "blur"},
          ],
          // empbirth: [
          //   {required: true, message: "请输入员工出生日期", trigger: "blur"},
          // ],

        },
        // =====================修改分类信息==============================
        // 控制修改对话框显示true/隐藏false
        editDialogVisible: false,
        // 修改分类信息
        editForm: {
          tarState: "",
          gysId: "",
          shid: "",
          Usertype:"",
          depid:"",
          portrait:"",
          pwdyan:"",
        },
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
        //分页
        params.append("pageno",this.pageno);
        params.append("pagesize",this.pagesize);
        params.append("name",document.getElementById("name").value)
        this.$axios.post("/showStaffMh.action",params).then(function (response) {
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
        this.$axios.post("/showStaff.action",params).then(function (response) {
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
        var _this=this;
        this.addDialogVisible=true;
        // this.$axios.post("/showAllSp.action").then(function (response){
        //     _this.jibie=response.data;
        // });
        // this.$axios.post("/showAllGys.action").then(function (response){
        //     _this.gys=response.data;
        // });
        // this.$axios.post("/showAllSh.action").then(function (response){
        //     _this.sh=response.data;
        // });
      },
      // 添加员工信息
      addEmpSp() {
        var _this=this;
        var params = new URLSearchParams();
        Object.keys(this.addForm).forEach(function (key){
          params.append(key,_this.addForm[key]);
        })
        this.$axios.post("/addStaff.action",params).then(res => {
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
          this.$axios.post("/deleteStaff.action?uid="+id).then(
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
        // this.$axios.post("/showAllSp.action").then(function (response){
        //     _this.jibie=response.data;
        // });
        // this.$axios.post("/showAllGys.action").then(function (response){
        //     _this.gys=response.data;
        // });
        // this.$axios.post("/showAllSh.action").then(function (response){
        //     _this.sh=response.data;
        // });
        var _this =this;
        this.$axios.post("/queryByidStaff.action?uid="+id).then(function (response) {
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
        // Object.keys(this.editForm).forEach(function (key){
        //   params.append(key,_this.editForm[key]);
        // })
        params.append("uid",this.editForm.uid);
        params.append("empno",this.editForm.empno);
        params.append("empname",this.editForm.empname);
        params.append("empsex",this.editForm.empsex);
        // params.append("depid",this.editForm.depid);
        params.append("empbirth",this.editForm.empbirth);
        // params.append("empworktime",this.editForm.empworktime);
        params.append("empwork",this.editForm.empwork);
        params.append("department",this.editForm.department);
        // params.append("portrait",this.editForm.portrait);
        params.append("password",this.editForm.password);
        // params.append("pwdyan",this.editForm.pwdyan);
        // params.append("department",this.editForm.department);
        // params.append("Usertype",this.editForm.Usertype);
        // params.append("start",this.editForm.start);
        params.append("email",this.editForm.email);
        params.append("phone",this.editForm.phone);
        this.$axios.post("/updateStaff.action",params).then(
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
