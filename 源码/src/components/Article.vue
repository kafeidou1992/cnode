<template>
    <div class="art">
        <div class="loading" v-if="loading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="topic" v-else>
            <div class="section">
                <div class="title">{{text.title}}</div>
                <ul class="detail">
                    <li>•发布于 {{text.create_at | fixtime}}</li>
                    <li>•作者 {{text.author.loginname}}</li>
                    <li>•{{text.visit_count}}次浏览</li>
                    <li>•最后一次编辑是 {{text.last_reply_at | fixtime}}</li>
                    <li>•来自 {{text|fixtype}}</li>
                </ul>
                <div class="content" v-html="text.content"></div>
            </div>
            <div class="reply" v-if="text.reply_count>0">
                <div class="toobar">
                    {{text.reply_count}} 回复
                </div>
                <ul>
                    <li v-for="(reply,index) in text.replies">
                        <div :class="{replydetail: true, clearfix:reply.ups.length>0}">
                            <router-link :to="{name:'userinfo',params:{name:reply.author.loginname}}">
                                <img :src="reply.author.avatar_url" alt="">
                                <span class="name">{{reply.author.loginname}}</span>
                            </router-link>
                            <span class="floortime">{{index+1}}楼•{{reply.create_at | fixtime}}</span>
                            <span class="isauthor" v-if="reply.author.loginname ===text.author.loginname">作者</span>
                            <span class="up" v-if="reply.ups.length>0" > 👍{{reply.ups.length}}</span>
                        </div>
                        <div class="content" v-html="reply.content"></div>  
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Article',
        data(){
            return {
                loading: false,
                text:{}
            }
        },
        methods:{
            getData(){
                this.axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
                .then(res=>{
                    if(res.data.success === true){
                        this.text = res.data.data   
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
<style>
@import '../assets/markdown.css';
.art {
    margin-right: 330px;
}
.art .loading {
    text-align: center;
}
.art .section {
    background-color: #fff;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 13px;
}
.art .section .title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
}
.art .section ul {
    list-style: none;
    margin: 6px 0px;
}
.art .section ul li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
}
.art .section .content {
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    line-height: 2em;
    font-size: 14px;
    word-break: break-word;
    color: #333;
    overflow: scroll;
}
.art .reply {
    background-color: #fff;
    border-radius: 3px;
}

.art .reply .toobar{
    border-radius: 3px 3px 0 0;
    padding: 10px;
    background-color: #f6f6f6;
    line-height: 16px;
    color: #333;
    font-size: 14px;
    height: 16px;
}
.art .reply ul{
    list-style: none;
}
.art .reply li{
    border-top: 1px solid #e5e5e5;
}
.art .reply .replydetail {
    padding: 10px;
}
.art .reply li img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    vertical-align: middle;
}
.art .reply li .name{
    font-size: 12px;
    font-weight: 700;
    color: #666;
}
.art .reply .replydetail a { 
    text-decoration: none;
} 
.art .reply li .floortime{
    font-size: 11px;
}
.art .reply li .isauthor{
    color: #fff;
    background-color: #6ba44e;
    padding: 2px;
    font-size: 12px;
}
.art .reply li .up{
    float: right;
    font-size: 15px;
    color: gray;
}
.art .reply li .content{
    padding: 0 10px 10px;
    line-height: 2em;
    font-size: 14px;
    word-break: break-word;
    color: #333;
    overflow: scroll;
}
</style>

