<template>
    <div class="slidebar">
        <div class="loading" v-if="loading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="content" v-else>
            <div class="userdata">               
                <div class="toobar">作者</div>                           
                <div class="detail">
                    <router-link :to="{name:'userinfo',params:{name:userinfo.loginname}}">
                        <div class="author">
                            <img :src="userinfo.avatar_url" alt="">
                            <span class="name">{{userinfo.loginname}}</span>
                        </div>
                    </router-link>
                    <p class="score">积分: {{userinfo.score}}</p>
                </div>
            </div>
            <div class="createtopic">
                <div class="toobar">最近创建的话题</div>
                <ul v-if="userinfo.recent_topics.length<1">
                    <li>无话题</li>
                </ul>
                <ul v-else>
                    <li v-for="list in recent_topics">
                        <router-link :to="{name:'topic',params:{id:list.id,name:list.author.loginname}}"><span class="title">{{list.title}}</span></router-link>
                    </li>
                </ul>
            </div>
            <div class="replytopic">
                <div class="toobar">最近参与的话题</div>
                <ul v-if="userinfo.recent_replies.length<1">
                    <li>无话题</li>
                </ul>
                <ul v-else>
                    <li v-for="list in recent_replies">                        
                        <router-link :to="{name:'topic',params:{id:list.id,name:list.author.loginname}}"><span class="title">{{list.title}}</span></router-link>                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'slidebar',
        data(){
            return {
                loading: false,
                userinfo: {}
            }
        },
        computed:{
            recent_topics(){
                if(this.userinfo.recent_topics){
                    return this.userinfo.recent_topics.slice(0,5)
                }
            },
            recent_replies(){
                if(this.userinfo.recent_replies){
                    return this.userinfo.recent_replies.slice(0,5)
                }
            }
        },
        methods:{
            getData(){
                this.axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then(res=>{
                    if(res.data.success === true){
                        this.userinfo = res.data.data   
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
            '$route.params.name'(to, from) {
                this.loading= true
                this.getData()
            }
        }
    }
</script>
<style scoped>
.slidebar {
    float: right;
    width: 320px;
}
.loading {
    text-align: center;
}
.slidebar .content .toobar {
    color: #51585c;
    border-radius: 3px 3px 0 0;
    padding: 10px;
    background-color: #f6f6f6;
    font-size: 13px;
    line-height: 20px;
}
.slidebar .content .userdata .detail{
    padding: 10px;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
    font-size: 13px;
    line-height: 20px;
}
.slidebar .content .userdata img{
    width: 40px;
    height: 40px;
    border-radius: 3px;
    vertical-align: middle;
}
.slidebar .content .userdata .name{
    color: #778087;
    vertical-align: middle;
    font-size: 14px;
    line-height: 20px;
    margin-left: 4px;
}
.slidebar .content .userdata .detail a{ 
    text-decoration: none;
} 
.slidebar .content .userdata .score{
    margin-top: 6px;
}
.createtopic,
.replytopic{
    margin-top: 14px;
}
.createtopic li,
.replytopic li{
    padding: 3px 10px;
    background-color: white;
    list-style: none;
    font-size: 14px;
    line-height: 30px;
    color: #778087;
}
.createtopic li .title,
.replytopic li .title{
    max-width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: #778087;
    vertical-align: top;
}
.createtopic li:hover,
.replytopic li:hover{
    background-color: #f6f6f6;
}
</style>
