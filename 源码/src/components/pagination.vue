<template>
    <ul class="pagination">
        <li><button :class="{active: currentpage!==1}" @click="changepage">首页</button></li>
        <li><button :class="{active: currentpage!==1}" @click="changepage">上一页</button></li>
        <li><button v-if="pagelist[0]>1">...</button></li>
        <li v-for="page in pagelist" @click="changepage(page)">
            <button class="active" :class="{current: page===currentpage}">{{page}}</button>
        </li>
        <li><button v-if="pagelist[4]<maxpage">...</button></li>
        <li><button :class="{active: currentpage!==maxpage}" @click="changepage">下一页</button></li>
        <li><button :class="{active: currentpage!==maxpage}" @click="changepage">尾页</button></li>
    </ul>
</template>
<script>
    export default {
        name: 'pagination',
        props: ['maxpage','currentpage'],
        computed: {
            pagelist(){
                if (this.maxpage===0) return []
                if(this.maxpage>0&&this.maxpage<5){
                    const arr = []
                    for(let i=0;i<this.maxpage;i++){
                        arr.push(i+1)
                    }
                    return arr
                }
                if(this.maxpage>=5){
                    if(this.currentpage-2>=1&&this.currentpage+2<=this.maxpage){
                        return [this.currentpage-2,this.currentpage-1,this.currentpage,this.currentpage+1,this.currentpage+2]
                    }else if(this.currentpage-2<1){
                        return [1,2,3,4,5]    
                    }else if(this.currentpage+2>this.maxpage){
                        return [this.maxpage-4,this.maxpage-3,this.maxpage-2,this.maxpage-1,this.maxpage]
                    }
                }
                
            }
        },
        methods:{
            changepage(val){
                if(typeof val!== "number"){
                    switch(val.target.innerText){
                        case "首页": 
                            if(this.currentpage !== 1){
                                this.changepage(1)
                            }
                        break;

                        case "上一页":
                            if(this.currentpage > 1){ 
                               this.changepage(this.currentpage-1)
                            }
                        break;

                        case "下一页": 
                            if(this.currentpage < this.maxpage){ 
                                this.changepage(this.currentpage+1)
                            }
                        break;

                        case "尾页": 
                            if(this.currentpage !== this.maxpage){
                                this.changepage(this.maxpage)
                            }
                        break;

                        default: 
                        break;
                    }
                }else{
                    this.$emit('handle',val)
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
    ul li button{
        font-size: 14px;
        display: inline-block;
        border: 1px solid #ddd;
        border-right: none;
        color: #999;
        padding: 4px 12px;
        line-height: 20px;
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
    ul li button.current{
        color: #80bd01;
    }
</style>

