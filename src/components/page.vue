<template>
  <div class="mian-page">
    <el-container class="box" ref="box">
      <div class="left" ref="left">
        <el-aside class="aside-cont" width="100%">
          <leftMenu></leftMenu>
        </el-aside>
      </div>
      <div class="resize" ref="resize"></div>
      <div :style="midWidth" class="mid" ref="mid" id="box">
        <el-container >
          <el-header><Headers></Headers></el-header>
          <div :style="topBoxHeight" id="topBoxId">
            <el-main><Main></Main></el-main>
          </div>
          <div id="resizeId" class="r-resize"></div>
          <!-- <div id="downBoxId"> -->
            <el-footer  id="downBoxId" height="190px"><Footer></Footer></el-footer>
          <!-- </div> -->
        </el-container>
      </div>
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
      json: null,
      midWidth: '--mid-width: 200px',
      topBoxHeight: '--top-box-height: 255px',
    };
  },
  mounted() {
    this.dragControllerDivWidth();
    this.dragControllerDivHeight();
    console.log(window)
  },
  methods: {
    dragControllerDivWidth() {
      const __this = this;
      let resize = document.getElementsByClassName("resize");
      let left = document.getElementsByClassName("left");
      let mid = document.getElementsByClassName("mid");
      let box = document.getElementsByClassName("box");

      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function(e) {
          let startX = e.clientX;
          resize[i].left = resize[i].offsetLeft;
          // 鼠标拖动事件
          document.onmousemove = function(e) {
            let endX = e.clientX;
            let moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            let maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

            if (moveLen < 150) moveLen = 150; // 左边区域的最小宽度为150px
            if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px

            resize[i].style.left = moveLen; // 设置左侧区域的宽度

            for (let j = 0; j < left.length; j++) {
              left[j].style.width = moveLen + "px";
              // mid[j].style = `--min-width: ${box[i].clientWidth - moveLen - 10}px);`
              
              __this.$set(__this, 'midWidth', `--mid-width: ${moveLen + 10}px`)
            }
          };
          // 鼠标松开事件
          document.onmouseup = function(evt) {
            document.onmousemove = null;
            document.onmouseup = null;
            resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    },
    dragControllerDivHeight() {
      const __this = this;
      let resize = document.getElementById("resizeId");
      let topBox = document.getElementById("topBoxId");
      let downBox = document.getElementById("downBoxId");
      let box = document.getElementById("box");
      resize.onmousedown = function(e) {
        let startY = e.clientY;
        resize.top = resize.offsetTop;
        document.onmousemove = function(e) {
          let endY = e.clientY;
          let moveLen = resize.top + (endY - startY);
          let maxT = box.clientHeight - resize.offsetHeight;
          if (moveLen < 100) moveLen = 100;
          if (moveLen > maxT - 100) moveLen = maxT - 100;
          resize.style.top = moveLen;
          // topBox.style.height = moveLen + "px";
          __this.topBoxHeight = `--top-box-height: ${box.clientHeight - moveLen - 5}px`
          downBox.style.height = box.clientHeight - moveLen - 5 + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
          resize.releaseCapture && resize.releaseCapture();
        };
        resize.setCapture && resize.setCapture();
        return false;
      };
    }
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
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  height: 190px;
  // margin-top: 10px;
  overflow-y: hidden;
  text-align: inherit;
  line-height: inherit;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  -ms-overflow-style: none;
  /*火狐下隐藏滚动条*/
  overflow: -moz-scrollbars-none;
}

.el-main::-webkit-scrollbar {
  display: none;
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

.box {
  width: 100%;
  overflow: hidden;
}
.left {
  width: 195px;
  height: 100%;
  background: #c9c9c9;
  float: left;
}
.resize {
  width: 5px;
  height: 100%;
  cursor: w-resize;
  float: left;
  width: 15px;
  background: #f0f0f0;
}
.mid {
  float: left;
  width: calc(100% - 200px);
  height: 100%;
  background: #e9eef3;
  width: calc(100% - var(--mid-width));
}

.r-resize {
  width: 100%;
  height: 5px;
  background: #f0f0f0;
  cursor: n-resize;
}
#topBoxId {
  overflow-y: scroll;
  width: 100%;
  height: calc(100% - 5px - 190px - 60px);
  -ms-overflow-style: none;
  /*火狐下隐藏滚动条*/
  overflow: -moz-scrollbars-none;
  height: calc(100% - var(--top-box-height));
}


#topBoxId::-webkit-scrollbar {
  display: none;
}
</style>
