import Vue from "vue";
import App from "./App.vue";
// 引入css
import "./assets/statics/site/css/style.css";

// 导入router路由
import router from './tools/router';
// 导入libs  第三方
import './tools/libs';
// 导入store
import store from './tools/store';

Vue.config.productionTip = false;

new Vue({
  // 选择器
  el: "#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App),
  // 挂载仓库
  store,
  // 生命周期函数
  beforeCreate(){
    // console.log('app-beforeCreate');
    this.axios.get('/site/account/islogin')
    .then(response=>{
      // console.log(response);
      // if(response.data.code=='logined')
      store.state.isLogin = response.data.code=='logined';
    })
    .catch(err=>{
      // console.log(err);
    })
  },
  created(){
    // console.log('app-created');
  }

});


