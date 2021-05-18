//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
//第三方库需要use一下才能用
Vue.use(VueRouter)

import Main from "../compennets/Mymain";
import Commodity from "../goods/commodity"
import CommodityDetails from "../goods/commodityDetails"
import TenanceGoods from "../goods/tenanceGoods";
import TenanceGoodsDetails from "../goods/tenanceGoodsDetails";
import Purchase from "../purchase/PurchaseTable";
import Vuee from "../login/App";
import Login from "../login/login";
import UYonghu from "../Udata/mainTenance"
import mainTenanceDetails from "../Udata/mainTenanceDetails";
import Supplier from "../supplierManagement/supplier";
import supplierDetails from "../supplierManagement/supplierDetails";
import supplierMain from "../supplierManagement/supplierMain";
import merchants from "../merchants/merchants";
import merchantsDetails from "../merchants/merchantsDetails";
import merchantsMain from "../merchants/merchantsMain";
import wareMain from "../warehouse/wareMain";
import wareDetails from "../warehouse/wareDetails";
import staff from "../staff/staff";
import staffDetails from "../staff/staffDetails";
import roles from "../roles/roles";
import rolesDetails from "../roles/rolesDetails";
import menus from "../menus/menus";
import menusDetails from "../menus/menusDetails";


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//定义routes路由的集合，数组类型
const routes = [{path: "/Vuee",component: Vuee,
  children:[
    {path:'/myMain',component:Main},
    {path: "/commodity",component: Commodity},
    {path: "/commodityDetails",component: CommodityDetails},
    {path: "/tenanceGoods",component: TenanceGoods},
    {path: "/tenanceGoodsDetails",component: TenanceGoodsDetails},
    {path: "/Purchase",component: Purchase},
    {path: "/Uyonghu",component: UYonghu},
    {path: "/Supplier",component: Supplier},
    {path: "/supplierDetails",component: supplierDetails},
    {path: "/supplierMain",component: supplierMain},
    {path: "/merchants",component: merchants},
    {path: "/merchantsDetails",component: merchantsDetails},
    {path: "/merchantsMain",component: merchantsMain},
    {path: "/wareMain",component: wareMain},
    {path: "/wareDetails",component: wareDetails},
    {path: "/staff",component: staff},
    {path: "/staffDetails",component: staffDetails},
    {path: "/roles",component: roles},
    {path: "/rolesDetails",component: rolesDetails},
    {path: "/menus",component: menus},
    {path: "/menusDetails",component: menusDetails},
    {path: "/mainTenanceDetails",component: mainTenanceDetails},
  ]},{path: "/",component: Login}
  //单个路由均为对象类型，path代表的是路径，component代表组件\
]

//实例化VueRouter并将routes添加进去
const router = new VueRouter({
//ES6简写，等于routes：routes
  routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router

