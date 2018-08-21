<template>
    <ul class="pagination">
        <li><button :class="{active: currentpage!==1}" @click="changepage">首页</button></li>
        <li><button :class="{active: currentpage!==1}" @click="changepage">上一页</button></li>
        <li><button v-if="pagelist[0]>1">...</button></li>
        <li v-for="page in pagelist" @click="changepage(page)">
            <a href="#" :class="{current: page===currentpage}">{{page}}</a>
        </li>
        <li><button v-if="pagelist[4]<maxpage">...</button></li>
        <li><button :class="{active: currentpage!==maxpage}" @click="changepage">下一页</button></li>
        <li><button :class="{active: currentpage!==maxpage}" @click="changepage">尾页</button></li>
    </ul>
</template>
<script>
    export default {
        name: 'pagination',
        props: ['maxpage','init'],
        data(){
            return {
                pagelist: [1,2,3,4,5],
                currentpage: 1
            }
        },
        watch:{
            init(){
                this.pagelist=[1,2,3,4,5]
                setTimeout(function(){
                    Array.from(document.querySelectorAll('.pagination a'))[0].click()
                },0)  
            }
        },
        methods:{
            changepage(val){
                if(typeof val!== "number"){
                    switch(val.target.innerText){
                        case "首页": 
                            if(this.currentpage !== 1){
                                this.pagelist=[1,2,3,4,5]
                                setTimeout(function(){
                                    Array.from(document.querySelectorAll('.pagination a'))[0].click()
                                },0)  
                            }
                        break;

                        case "上一页":
                            if(this.currentpage !== 1){ 
                                [...document.querySelectorAll('.pagination a')][this.pagelist.indexOf(this.currentpage)-1].click()
                            }
                        break;

                        case "下一页": 
                            if(this.currentpage !== this.maxpage){ 
                                [...document.querySelectorAll('.pagination a')][this.pagelist.indexOf(this.currentpage)+1].click()
                            }
                        break;

                        case "尾页": 
                            if(this.currentpage !== this.maxpage){
                                this.pagelist=[this.maxpage-4,this.maxpage-3,this.maxpage-2,this.maxpage-1,this.maxpage]
                                setTimeout(function(){
                                    Array.from(document.querySelectorAll('.pagination a'))[4].click()
                                },0)  
                            }
                        break;

                        default: 
                        break;
                    }
                }else{
                    this.currentpage = val
                    this.$emit('handle',this.currentpage)
                    if(val>=this.pagelist[3]&&this.pagelist[4]<this.maxpage){
                        this.pagelist.shift()
                        this.pagelist.push(this.pagelist[3]+1)
                    }else if(val<=this.pagelist[1]&&this.pagelist[0]>1){
                        this.pagelist.unshift(this.pagelist[0]-1)
                        this.pagelist.pop()
                    }
                }
            }
        }

    }
</script>
<style scoped>
    ul {
        list-style: none;
        background-color: #fff;
        border-radius: 0 0 3px 3px;
        font-size: 0;
        padding: 10px;
    }
    ul li {
        display: inline-block;
    }
    ul li a,
    ul li button{
        font-size: 14px;
        display: inline-block;
        border: 1px solid #ddd;
        border-right: none;
        color: #999;
        padding: 4px 12px;
        line-height: 20px;
        text-decoration: none;   
    }
    ul li button{
        outline: none;
    }
    ul li button.active{
        cursor: pointer;
    }
    ul li:first-child button{
        border-radius: 4px 0 0 4px;
    }
    ul li:last-child button{
        border-right: 1px solid #ddd;
        border-radius: 0 4px 4px 0;
    }
    ul li a.current{
        color: #80bd01;
    }
</style>

