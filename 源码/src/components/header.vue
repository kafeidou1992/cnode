<template>
    <header class="clearfix">
        <router-link to="/">
            <img src="../assets/cnodejs.svg" alt="">
        </router-link> 
        <ul>
            <router-link to="/">
            <li><a href="#">首页</a></li>
            </router-link> 
            <li><a href="#">新手入门</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">关于</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">登录</a></li>
        </ul>
    </header>
</template>
<script>
  export default {
        name: 'header'
  }

</script>
<style scoped>
header {
    background-color: #444;
    min-height: 50px;
}

img {
    width: 120px;
    margin-left: 70px;
    margin-top: 10px;
    display: inline-block;
}

ul {
    list-style: none;
    float: right;
    margin-top: 5px;
    font-size: 0;
    margin-right: 70px;
}

li {
    display: inline-block;
}

ul li a {
    display: inline-block;
    text-decoration: none;
    color: #ccc;
    font-size: 13px;
    line-height: 16px;
    padding:  12px 15px;
}
 
ul li a:hover{
    color: #fff;
}
</style>

