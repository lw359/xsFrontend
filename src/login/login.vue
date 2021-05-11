<template>
  <div class="login-container">
    <el-form :model="ruleForm2" :rules="rules2"
             status-icon
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">并夕夕优选后台管理</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm2.username"
                  auto-complete="off"
                  placeholder="请输入工号"
                  prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-turn-off"
                  show-password
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;"
                     @click="handleSubmit"
                     v-loading.fullscreen.lock="fullscreenLoading"
          >登录</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Apps from "../login/App"
    export default {
        name: "login",
      data(){
        return {
          fullscreenLoading: false,
          ruleForm2: {
            username: '',
            password: '',
          },
          rules2: {
            username: [{required: true, message: 'The job number must not be empty', trigger: 'blur'}],
            password: [{required: true, message: 'Password must not be empty', trigger: 'blur'}]
          },
          checked: false
        }
      }
      ,
      methods: {
        handleSubmit(){
          var _this=this;
          var params = new URLSearchParams();
          Object.keys(this.ruleForm2).forEach(function (key){
            params.append(key,_this.ruleForm2[key]);
          })
          this.$axios.post("/longin.action",params).then(
            function (response){
              if (response.data){
                _this.$message.success("登录成功！");
                _this.fullscreenLoading = true;
                setTimeout(() => {
                  _this.fullscreenLoading = false;
                  //保存session
                  sessionStorage.setItem("username",_this.ruleForm2.username);
                  _this.$router.push({path:"/Vuee"});
                }, 3000);
              }else {
                _this.ruleForm2.username="";
                _this.ruleForm2.password="";
                _this.$message.error("登录失败！工号/密码不存在");
              }
            }
          )
        }
      }
    }
</script>
<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
