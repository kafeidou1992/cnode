// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios = axios

/* eslint-disable no-new */
Vue.filter('fixtime',val=>{
  if(!val){
    return ''
  }
  let replay = new Date(val)
  let t= Date.now() - replay.getTime()
  if(t<1000*30){
    return '刚刚'
  }else if(t<1000*60){
    return Math.floor(t/1000)+'秒前'
  }else if(t<1000*60*60){
    return Math.floor(t/(1000*60))+'分钟前'  
  }else if(t<1000*60*60*24){
    return Math.floor(t/(1000*60*60))+'小时前'
  }else if(t<1000*60*60*24*30){
    return Math.floor(t/(1000*60*60*24))+'天前'
  }else if(t<1000*60*60*24*365){
    return Math.floor(t/(1000*60*60*24*30))+'月前'
  }else{
    return Math.floor(t/(1000*60*60*24*365))+'年前'
  }
})
Vue.filter('fixtype',val=>{
  if(val.top===true){
    return '置顶'
  }else if(val.good===true){
    return '精华'
  }else if(val.tab==='share'){
    return '分享'
  }else if(val.tab==='job'){
    return '招聘'
  }else{
    return '问答'
  }
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
