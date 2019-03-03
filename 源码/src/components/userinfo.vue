<template>
    <div class="userinfo">
        <div class="loading" v-if="loading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="section" v-else>
            <div class="userdata">
                <div class="toobar">
                    <router-link to="/">
                        <span class="homepage">主页</span>
                    </router-link> 
                </div>         
                <div class="detail">
                    <img :src="userinfo.avatar_url" alt="">
                    <span class="name">{{userinfo.loginname}}</span>
                    <p class="score">{{userinfo.score}} 积分</p>
                    <div class="github" v-if="githuburl">
                        <img src="../assets/github.png" alt="">
                        <a :href="githuburl" target="_blank">@{{userinfo.githubUsername}}</a>
                    </div>
                    <p class="createtime">注册时间{{userinfo.create_at | fixtime}}</p>
                </div>
            </div>
            <div class="createtopic">
                <div class="toobar">最近创建的话题</div>
                <ul v-if="userinfo.recent_topics.length<1">
                    <li>无话题</li>
                </ul>
                <ul v-else>
                    <li v-for="list in userinfo.recent_topics" class="clearfix">
                        <img :src="list.author.avatar_url">
                        <router-link :to="{name:'topic',params:{id:list.id,name:list.author.loginname}}"><span class="title">{{list.title}}</span></router-link>
                        <span class="replytime">
                            <img :src="list.author.avatar_url" alt="">
                            <span class="time">{{list.last_reply_at |fixtime}}</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="replytopic">
                <div class="toobar">最近参与的话题</div>
                <ul v-if="userinfo.recent_replies.length<1">
                    <li>无话题</li>
                </ul>
                <ul v-else>
                    <li v-for="list in userinfo.recent_replies" class="clearfix">
                        <router-link :to="{name:'userinfo',params:{name:list.author.loginname}}">
                            <img :src="list.author.avatar_url">
                        </router-link>
                        <router-link :to="{name:'topic',params:{id:list.id,name:list.author.loginname}}"><span class="title">{{list.title}}</span></router-link>
                        <span class="replytime">
                            <img :src="list.author.avatar_url" alt="">
                            <span class="time">{{list.last_reply_at |fixtime}}</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'userinfo',
        data(){
            return {
                loading: false,
                userinfo: {},
                githuburl:''
            }
        },
        methods:{
            getData(){
                this.axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then(res=>{
                    if(res.data.success === true){
                        this.userinfo = res.data.data
                        if(this.userinfo.githubUsername){
                            this.githuburl='https://github.com/'+this.userinfo.githubUsername
                        }
                    } 
                    this.loading= false
                })
                .catch(err=>{
                    this.loading= false
                    console.log(err)
                })
            }
        },
        beforeMount(){
            this.loading= true
            this.getData()
        },
        watch: {
            '$route'(to, from) {
                this.loading= true
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
.toobar{
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    font-size: 14px;
    line-height: 20px;
}
.homepage{
    color: #80bd01;
}
.section .userdata .toobar a{
    text-decoration: none;
}
.section .userdata .detail{
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
    font-size: 14px;
    color: #778087;
}
.section .userdata .detail>img{
    width: 40px;
    height: 40px;
    border-radius: 3px;
    vertical-align: middle; 
}
.section .userdata .detail .score{
    margin: 10px 0;
    color: #333;
}
.section .userdata .detail .github img{
    width: 20px;
    height: 20px;
    border-radius: 100%;
    vertical-align: middle; 
    background-color: #778087; 
    margin-right: 4px;
}
.section .userdata .detail .github a{
   color: #778087;
   text-decoration: none;
   vertical-align: middle; 
}
.section .userdata .detail .createtime{
    margin-top: 10px;
}
.createtopic,
.replytopic{
    margin-top: 14px;
}
.createtopic li,
.replytopic li{
    padding: 9px;
    font-size: 15px;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
    line-height: 30px;
}
.createtopic li img,
.replytopic li img{
    height: 30px;
    width: 30px;
    border-radius: 3px;
    vertical-align: middle;
}
.createtopic li .title,
.replytopic li .title{
    max-width: 60%;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
    font-size: 15px;
    overflow: hidden;
    color: #333;
    margin-left: 6px;
}
.createtopic li .title:hover,
.replytopic li .title:hover{
    text-decoration: underline;
}
.createtopic .replytime,
.replytopic .replytime{
    float: right;
    margin-left: 20px;
}
.createtopic .replytime .time,
.replytopic .replytime .time{
    text-align: right;
    min-width: 50px;
    float: right;
    color: #778087;
    font-size: 12px;
}
.createtopic .replytime img,
.replytopic .replytime img{
    height: 18px;
    width: 18px;
    border-radius: 3px;
    vertical-align: middle;
    margin-right: 6px;
}
.createtopic li:hover,
.replytopic li:hover{
    background-color: #f6f6f6;
}

</style>

