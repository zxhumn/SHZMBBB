import Vue from "vue";

// 导入ui框架
import ElementUI from "element-ui";
// 导入css
import "element-ui/lib/theme-chalk/index.css";
// 导入懒加载插件
import VueLazyload from "vue-lazyload";
// 引入模块 moment
import moment from "moment";

// 导入iViewUI框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';





// 使用ui中间件 $message
Vue.use(ElementUI);
// 使用懒加载中间件
Vue.use(VueLazyload, {
  // 图片当做资源来引入
  loading: require('../assets/statics/img/loading2.gif')
});
// 使用iView $Message
Vue.use(iView);

// 注册全局过滤器
Vue.filter('cutTime', function (value,condition) {
    if(condition){
      return moment(value).format(condition);
  
    }else{
      return moment(value).format("YYYY年MM月DD日");
    }
  });

 

  