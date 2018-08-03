<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link>&gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment" v-if="orderInfo">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                    <qrcode :value="codeUrl" :options="{ size: 200 }"></qrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 引入二维码
    import VueQrcode from '@xkeshi/vue-qrcode';
export default {
    data:function(){
        return{
            orderid:0,
            orderInfo:undefined,
            codeUrl:undefined,
        }
    },
    // 注册二维码组件
   components:{
    qrcode: VueQrcode
    },
    // 赋值
    created() {
        this.orderid = this.$route.params.orderid ;
        this.codeUrl =`http://47.106.148.205:8899/site/validate/order/getorder/${this.orderid}`;
        this.axios.get(`site/validate/order/getorder/${this.orderid}`)
        .then(response=>{
            // console.log(response);
            this.orderInfo = response.data.message[0];
        }).catch(err=>{})
        // 轮询
       let timerId= setInterval(()=>{
           this.axios.get(`site/validate/pay/alipay/${this.orderid}`)
           .then(response=>{
               if(response.data.message[0].status==2){
                   // 支付了
                   this.$Message.success('支付成功了');
                   this.$route.push('/paySuccess/');
                   clearInterval(timerId);
               }
           }).catch(err=>{})
        },500);
    },
}
</script>

