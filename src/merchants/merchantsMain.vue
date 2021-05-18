<template>
  <div id="app">
    <el-container style="margin-top: -10px;margin-left: -10px">
      <el-header>
        <el-menu  class="el-menu-demo" mode="horizontal"style="width: 100%;margin-left: -20px">
          <el-menu-item style="margin-top: -18px">
            <h1>商户管理 > 商户信息维护</h1>
          </el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main>
        <div style="margin-top: 0px;left: -500px">
          <el-input
            placeholder="输入商户名称"
            v-model="input"
            clearable style="width: 250px"
            id="shangHuName"
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
            <el-table-column prop="sHId" label="商户编号" width="150">
              <template slot-scope="scope">
                <router-link :to="{path:'/merchantsDetails',query:{id:scope.row.shid}}" class="a" >
                  {{ scope.row.shid }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="shangHuName" label="商户名称"  ></el-table-column>
            <el-table-column prop="phone" label="电话"  ></el-table-column>
            <el-table-column prop="shhulxr" label="联系人"  ></el-table-column>
            <el-table-column prop="menDianAdrss" label="商户地址"  ></el-table-column>
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
                           @click="showEditDialog(scope.row.shid)">修改</el-button>
                <!-- 删除 -->
                <el-button round type="danger" icon="el-icon-delete" size="mini"
                           @click="deleteEmpInfo(scope.row.shid)">删除</el-button>
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
        <el-dialog  title="添加商户信息" :visible.sync="addDialogVisible" @close="addDialogClosed" width="50%">
          <el-form  :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
            <!-- 商户名称 -->
            <el-form-item label="商户名称" prop="shangHuName">
              <el-input v-model="addForm.shangHuName"></el-input>
            </el-form-item>
            <!-- 商户电话 -->
            <el-form-item label="商户电话" prop="phone">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <!-- 联系人 -->
            <el-form-item label="联系人" prop="shhulxr">
              <el-input v-model="addForm.shhulxr"></el-input>
            </el-form-item>
            <!-- 联系地址 -->
            <el-form-item label="联系地址" prop="menDianAdrss">
              <el-input v-model="addForm.menDianAdrss"></el-input>
            </el-form-item>

            <!-- 电话号码 -->
            <el-form-item label="电话号码" prop="supPhone">
              <el-input v-model="addForm.supPhone"></el-input>
            </el-form-item>

            <!-- 订单id -->
<!--            <el-form-item label="订单id" prop="ddId">-->
<!--              <el-input v-model="addForm.ddId"></el-input>-->
<!--            </el-form-item>-->

            <!-- 审核状态 -->
<!--            <el-form-item label="审核状态" prop="merstate">-->
<!--              <el-input v-model="addForm.merstate"></el-input>-->
<!--            </el-form-item>-->
          </el-form>
          <!-- 内容底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addEmpSp">添 加</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>


        <!-- 修改用户对话框 -->
        <el-dialog title="修改商户信息" :visible.sync="editDialogVisible" width="50%" @colse="editDialogClosed">
          <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
            <!-- 商户名称 -->
            <el-form-item label="商户名称" prop="shangHuName">
              <el-input v-model="editForm.shangHuName"></el-input>
            </el-form-item>
            <!-- 电话号码 -->
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="editForm.phone"></el-input>
            </el-form-item>
            <!-- 商户地址 -->
            <el-form-item label="商户地址" prop="menDianAdrss">
              <el-input v-model="editForm.menDianAdrss"></el-input>
            </el-form-item>
            <!-- 商户盈利 -->
            <el-form-item label="商户盈利" prop="yl">
              <el-input v-model="editForm.yl"></el-input>
            </el-form-item>
            <!-- 联系人电话 -->
            <el-form-item label="联系人电话" prop="shhulxr">
              <el-input v-model="editForm.shhulxr"></el-input>
            </el-form-item>
            <!-- 联系地址 -->
<!--            <el-form-item label="用户订单" prop="ddId">-->
<!--              <el-input v-model="editForm.ddId"></el-input>-->
<!--            </el-form-item>-->


            <!-- 状态 -->
            <el-form-item label="状态" prop="shStat">
              <el-select v-model="editForm.shStat" size="medium" clearable  placeholder="请选择状态">
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
        //存放状态
        Stated:[
          {id:"Z-001",name:"营业中"},
          {id:"Z-002",name:"歇业"}
        ],
        //存放状态
        merstate:[
          {id:"M-001",name:"未审核"},
        ],
        //存放展示信息
        cationData: [],
        input: '',
        //存放分类级别
        jibie:[],
        //存放商户
        gys:[],
        //存放商户
        sh:[],
// ============================添加分类信息==================
        addDialogVisible: false,// 添加数据对话框：false 隐藏 true 显示
        // 添加分类表单项 请求参数
        addForm: {


        },
        // 添加时/(修改时也可复用)查询所有的部门
        DepartmentList: [],
        // 添加数据对话框验证规则
        addFormRules: {
          shangHuName:[
            {required: true, message: "请输入商户编号", trigger: "blur"}
          ],
          phone: [
            {required: true, message: "请输入户商名称", trigger: "blur"}
          ],
          shhulxr: [
            {required: true, message: "请输入联系人", trigger: "blur"},
          ],
          menDianAdrss: [
            {required: true, message: "请输入联系地址", trigger: "blur"},
          ],
          supPhone: [
            {required: true, message: "请输入联系人电话", trigger: "blur"},
          ]
        },
        // =====================修改分类信息==============================
        // 控制修改对话框显示true/隐藏false
        editDialogVisible: false,
        // 修改分类信息
        editForm: {
          tarState: "",
          shStat: "",
          shid: "",
          ddId: "",
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
        params.append("name",document.getElementById("shangHuName").value)
        this.$axios.post("/showByIdMerch.action",params).then(function (response) {
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
        params.append("mer_state","M-002")
        this.$axios.post("/showAllMerch.action",params).then(function (response) {
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
      // 添加商品信息
      addEmpSp() {
        var _this=this;
        var params = new URLSearchParams();
        Object.keys(this.addForm).forEach(function (key){
          params.append(key,_this.addForm[key]);
        })
        this.$axios.post("/addMerch.action",params).then(res => {
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
          this.$axios.post("/deleteMerch.action?shid="+id).then(
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
        this.$axios.post("/queryByidMerch.action?id="+id).then(function (response) {
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
        params.append("sHId",this.editForm.shid);
        params.append("shangHuName",this.editForm.shangHuName);
        params.append("phone",this.editForm.phone);
        params.append("menDianAdrss",this.editForm.menDianAdrss);
        params.append("yl",this.editForm.yl);
        params.append("ddId",this.editForm.ddId);
        params.append("shhulxr",this.editForm.shhulxr);
        params.append("shStat",this.editForm.shStat);
        this.$axios.post("/updateMerch.action",params).then(
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
