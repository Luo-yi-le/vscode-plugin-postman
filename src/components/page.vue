<template>
    <div class="mian-page">
        <el-container>
            <el-aside width="200px"><leftMenu></leftMenu></el-aside>
            <el-container class="">
                <el-header><Headers></Headers></el-header>
                <el-main><Main></Main></el-main>
                <el-footer height="190px"><Footer></Footer></el-footer>
            </el-container>
            </el-container>
    </div>
</template>
<script>
import leftMenu from "./leftMenu";
import Headers from "./header";
import Footer from "./footer";
import Main from "./main";
export default {
  components: {
    leftMenu,
    Headers,
    Footer,
    Main
  },
  data() {
    return {
      json: null
    };
  },
  mounted() {},
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.mian-page {
  display: block;
  padding: 0px;
  margin: 0px;
  height: 100%;
}

.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-header,
.el-footer {
 
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer{
  height: 190px;
  margin-top: 10px;
  overflow-y: hidden;
  text-align: inherit;
  line-height: inherit;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  -ms-overflow-style:none;
    /*火狐下隐藏滚动条*/
  overflow:-moz-scrollbars-none;
}

.el-main::-webkit-scrollbar{
    display:none;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
