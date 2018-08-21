import Vue from 'vue'
import Router from 'vue-router'
import postlist from '../components/postlist'
import Article from '../components/Article'
import userinfo from '../components/userinfo'
import slidebar from '../components/slidebar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main: postlist
      }
    },{
      name:'topic',
      path:'/topic/:id&author=:name',
      components:{
        main: Article,
        slide: slidebar
      }
    },
    {
      name:'userinfo',
      path:'/userinfo/:name',
      components:{
        main: userinfo
      }
    }
  ]
})
