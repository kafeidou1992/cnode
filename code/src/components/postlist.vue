<template>
    <div class="postlist">
        <div class="loading" v-if="loading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="list" v-else>
            <div class="toobar">
                <ul>
                    <li  @click="tabchange('all')"><a href="#" :class="{active: tab==='all'}">全部</a></li>
                    <li  @click="tabchange('good')"><a href="#" :class="{active: tab==='good'}">精华</a></li>
                    <li  @click="tabchange('share')"><a href="#" :class="{active: tab==='share'}">分享</a></li>
                    <li  @click="tabchange('ask')"><a href="#" :class="{active: tab==='ask'}">问答</a></li>
                    <li  @click="tabchange('job')"><a href="#" :class="{active: tab==='job'}">招聘</a></li>
                </ul>
            </div>
            <div class="content">
                <ul>
                    <li v-for="list in lists" class="clearfix">
                        <router-link :to="{name:'userinfo',params:{name:list.author.loginname}}">
                            <img :src="list.author.avatar_url" alt="">
                        </router-link>
                        <span class="count"><span class="replynum">{{list.reply_count}}</span><span class="visitnum">/{{list.visit_count}}</span></span>
                        <span :class="[{typeadd: (list.top||list.good)},typecom]">{{list | fixtype}}</span>
                        <router-link :to="{name:'topic',params:{id:list.id,name:list.author.loginname}}"><span class="title">{{list.title}}</span></router-link>
                        <span class="replytime">
                            <img :src="list.author.avatar_url" alt="">
                            <span class="time">{{list.last_reply_at |fixtime}}</span>
                        </span>
                    </li>
                </ul>
            </div>
            <pagination @handle="renderList" :maxpage="maxpage" :init="init"></pagination>
        </div>
    </div>
</template>
<script>
    import pagination from './pagination'
    export default {
        name: 'postlist',
        components:{
           pagination 
        },
        data(){
            return {
                loading: false,
                lists: [],
                typecom: 'typecom',
                currentpage: 1,
                tab: 'all',
                maxpage: 100,
                init: true
            }
        },
        computed:{
            params(){
                switch(this.tab){
                    case "all": 
                        return {page: this.currentpage,limit: 20}
                    break;

                    case "good":
                        return{tab: 'good',page: this.currentpage,limit: 20}
                    break;

                    case "share": 
                        return{tab: 'share',page: this.currentpage,limit: 20}
                    break;

                    case "ask": 
                        return{tab: 'ask',page: this.currentpage,limit: 20} 
                    break;

                    case "job": 
                        return{tab: 'job',page: this.currentpage,limit: 20} 
                    break;

                    default: 
                    break;
                }
            }
        },
        methods:{
            getData(){
                this.axios.get('https://cnodejs.org/api/v1/topics',{
                    params: this.params
                })
                .then(res=>{
                    if(res.data.success === true){
                        this.lists = res.data.data
                        this.loading= false
                    } 
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            renderList(val){
                this.currentpage=val
                this.getData()
            },
            tabchange(val){
                if(val==='all'){
                   this.tab = 'all'
                   this.init = !this.init
                   this.maxpage=100
                   this.getData()
                }else if(val==='good'){
                    this.tab = 'good'
                    this.init = !this.init
                    this.maxpage=20
                    this.getData()
                }else if(val==='share'){
                    this.tab = 'share'
                    this.init = !this.init
                    this.maxpage=40
                    this.getData()
                }else if(val==='ask'){
                    this.tab = 'ask'
                    this.init = !this.init
                    this.maxpage=50
                    this.getData()
                }else if(val==='job'){
                    this.tab = 'job'
                    this.init = !this.init
                    this.maxpage=15
                    this.getData()
                }
            }
        },
        beforeMount(){
            this.loading= true
            this.getData()
        }
    }

</script>
<style scoped>
.loading {
    text-align: center;
}
ul {
    list-style: none;
}
.toobar {
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 3px 3px 0 0;
}
.toobar li{
    display: inline-block;
    margin: 0 10px;
}
.toobar li a{
    border-radius: 3px;
    display: inline-block;
    padding: 2px 3px;
    text-decoration: none;
    color: #80bd01; 
    font-size: 14px;
    line-height: 20px;
}
.toobar li a.active{
    background-color: #80bd01; 
    color: #fff;
}
.content li{
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
    line-height: 30px;
}
.content li:nth-child(1) {
    border-top: none;
}
.content li img {
    height: 30px;
    width: 30px;
    border-radius: 3px;
    vertical-align: middle;
}
.content li .count{
    width: 70px;
    display: inline-block;
    text-align: center;
}
.content li .replynum {
    color: #9e78c0;
    font-size: 14px;
    
}
.content li .visitnum {
    color: #aaa;
    font-size: 12px;
}
.content li .typecom {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
}
.content li .typeadd {
    background: #80bd01;
    color: #fff;
}
.content li .title{
    max-width: 60%;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    line-height: 30px;
    overflow: hidden;
    color: #333;
}
.content li .title:hover{
    text-decoration: underline;
}
.content .replytime{
    float: right;
    margin-left: 20px;
}
.content .replytime .time{
    text-align: right;
    min-width: 50px;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
}
.content .replytime img{
    height: 18px;
    width: 18px;
    border-radius: 3px;
    vertical-align: middle;
    margin-right: 6px;
}
.content li:hover{
    background-color: #f6f6f6;
}

</style>

