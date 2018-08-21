<template>
  <div id="app">
    <Header></Header>
    <main class="clearfix">
      <router-view name="slide"></router-view>
      <router-view name="main"></router-view>
    </main>
  </div>
</template>

<script>
import Header from "./components/header"

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
  background-color: #e1e1e1;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
main {
  padding: 15px 0 30px 0;
  width: 80%; 
  margin: 0 auto;
}
</style>


