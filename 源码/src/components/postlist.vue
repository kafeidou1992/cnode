<template>
    <div class="postlist">
        <div class="loading" v-if="loading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="list" v-else>
            <div class="toobar">
                <ul>
                    <li  @click="tabchange('all')" :class="{active: tab==='all'}">全部</li>
                    <li  @click="tabchange('good')" :class="{active: tab==='good'}">精华</li>
                    <li  @click="tabchange('share')" :class="{active: tab==='share'}">分享</li>
                    <li  @click="tabchange('ask')" :class="{active: tab==='ask'}">问答</li>
                    <li  @click="tabchange('job')" :class="{active: tab==='job'}">招聘</li>
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
            <pagination @handle="handle" :maxpage="maxpage"  :currentpage="currentpage"></pagination>
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
                maxpage: 0
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
                        console.log(res)
                        this.lists = res.data.data
                        switch(this.tab){   //没有返回数据总量的相关信息，自定义
                            case "all": 
                                this.maxpage=100
                            break;

                            case "good":
                                this.maxpage=20
                            break;

                            case "share": 
                                this.maxpage=40 
                            break;

                            case "ask": 
                                this.maxpage=50   
                            break;

                            case "job": 
                                this.maxpage=15  
                            break;
                        }
                    } 
                    this.loading= false
                })
                .catch(err=>{
                    this.loading= false
                    console.log(err)
                })
            },
            handle(val){
                this.currentpage=val
                this.$router.push({path: '/',query:{tab: this.tab,page: this.currentpage}})
            },
            tabchange(val){
                this.tab = val
                this.currentpage=1
                this.$router.push({path: '/',query:{tab: this.tab,page: this.currentpage}})
            }
        },
        beforeMount(){
            if(this.$route.query.tab){
                this.tab = this.$route.query.tab
                this.currentpage = parseInt(this.$route.query.page)
            }else{
                this.tab = 'all'
                this.currentpage = 1
            }
            this.loading= true
            this.getData()
        },
        watch: {
            '$route'(){
                if(this.$route.query.tab){
                    this.tab = this.$route.query.tab
                    this.currentpage = parseInt(this.$route.query.page)
                }else{
                    this.tab = 'all'
                    this.currentpage = 1
                }
                this.getData()
            }
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
    border-radius: 3px;
    padding: 2px 3px;
    color: #80bd01; 
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
}
.toobar li.active{
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

