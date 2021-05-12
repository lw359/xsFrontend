<template>
  <div id="app">
    <el-container style="margin-top: -10px;margin-left: -10px">
      <el-header>
        <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" style="width: 1530px;margin-left: -20px">
          <el-menu-item><img src="../assets/微信图片_20210429185327.jpg" style="width: 100px;height: 55px"></el-menu-item>
          <el-menu-item>
            <el-radio-group v-model="isCollapse">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
          </el-menu-item>
          <el-menu-item style="margin-top: -18px">
            <h1>并夕夕优选后台管理系统</h1>
          </el-menu-item>
          <el-menu-item  >
            <span>当前员工工号：{{username}}</span>
          </el-menu-item>
          <el-menu-item>
            <router-link to="/" class="a">
              <el-menu-item  >
                <span>退出登录</span>
              </el-menu-item>
            </router-link>
          </el-menu-item>
        </el-menu>

        <div class="line"></div>


      </el-header>
      <el-container>
        <el-aside width="210px" style="height: 680px">
          <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <!--            @click="cmenu"-->
            <router-link to="/myMain" class="a" >
              <el-menu-item index="1" >
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
              </el-menu-item>
            </router-link>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">系统管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title">公司</span>
                <router-link to="/myMain" class="a">
                  <el-menu-item index="1-1">员工管理</el-menu-item>
                </router-link>
                <el-menu-item index="1-2">角色管理</el-menu-item>
                <el-menu-item index="1-3">权限管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="系统">
                <el-menu-item index="1-4">菜单管理</el-menu-item>
                <el-menu-item index="1-5">职位管理</el-menu-item>
              </el-menu-item-group>

            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">商品资料维护</span>
              </template>
              <router-link to="/commodity" class="a">
              <el-menu-item index="1-6">商品分类信息维护</el-menu-item>
              </router-link>
              <router-link to="/tenanceGoods" class="a">
              <el-menu-item index="1-7">商品信息维护</el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">用户管理</span>
              </template>
              <router-link to="/Uyonghu" class="a">
                <el-menu-item index="1-8">普通用户资料维护</el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">供应商管理</span>
              </template>
              <router-link to="/Supplier" class="a">
                <el-menu-item index="1-9">供应商信息审核</el-menu-item>
              </router-link>
              <el-menu-item index="2-0">供应商维护</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">商户管理</span>
              </template>
              <el-menu-item index="2-0">商户信息审核</el-menu-item>
              <el-menu-item index="2-1">商户信息维护</el-menu-item>
            </el-submenu>

            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-house"></i>
                <span slot="title">仓库管理</span>
              </template>
              <el-menu-item index="2-2">仓库信息维护</el-menu-item>
            </el-submenu>

            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-sell"></i>
                <span slot="title">统计管理</span>
              </template>
              <router-link to="/Purchase" class="a">
              <el-menu-item index="2-3">采购申请</el-menu-item>
              </router-link>
              <el-menu-item index="2-4">采购申请记录</el-menu-item>
              <el-menu-item index="2-5">采购申请审核</el-menu-item>
              <el-menu-item index="2-6">采购申请审核记录</el-menu-item>
            </el-submenu>

            <el-submenu index="9">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">入库管理</span>
              </template>
              <el-menu-item index="2-7">入库审核</el-menu-item>
              <el-menu-item index="2-8">入库审核记录</el-menu-item>
            </el-submenu>

            <el-submenu index="10">
              <template slot="title">
                <i class="el-icon-suitcase"></i>
                <span slot="title">配送管理</span>
              </template>
              <el-menu-item index="2-9">调拨配送</el-menu-item>
            </el-submenu>

            <el-submenu index="11">
              <template slot="title">
                <i class="el-icon-truck"></i>
                <span slot="title">车辆管理</span>
              </template>
              <el-menu-item index="3-0">车辆信息维护</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>


<script>
  export default {
    name: 'app',
    data () {
      return {
        isCollapse: false,
        handleSelect:false,
        username:'',
      }
    },
    created() {
      this.getdata();
    },
    methods: {
      handleOpen(key, keyPath) {
       // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
       // console.log(key, keyPath);
      },
      activeIndex() {

      },
      getdata(){
        var _this=this;
        _this.username= sessionStorage.getItem("username");
      }
    },
  }
</script>

<style>
  .a{
    text-decoration: none;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-main {
    /*background-color: yellow;*/
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 700px;
  }

</style>

