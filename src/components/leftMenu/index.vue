<template>
    <div class="left-menu">
        <el-collapse accordion>
            <template v-for="(meta, index) in metadata">
                <el-collapse-item :key="index">
                    <template slot="title">
                        <span>{{meta.time | filterTime}}</span>
                    </template>
                    <template v-for="(data, $index) in meta.data">
                        <div :title="data.url" class="row" :key="$index">
                          <span class="icom"><i class="el-icon-delete"></i></span>
                          <span class="item">{{data.method | toUpperCase}} {{data.url}}</span>
                          
                        </div>
                    </template>
                </el-collapse-item>
            </template>
            
        </el-collapse>
    </div>
</template>
<script>
import { LStorage } from "@/utils/Store";
export default {
  data() {
    return {
      metadata: []
    };
  },
  mounted() {
    this.init();
    this.sendMetaData();
  },
  methods: {
    init() {
      this.metadata = JSON.parse(LStorage.getItem("metadata")) || [];
      console.log(this.metadata)
    },
    sendMetaData() {
      this.$bus.on("send-metadata", flag => {
        console.log(flag)
        if (flag) {
          this.init();
        }
      });
    }
  },
  beforDestory() {
    this.$bus.off("send-metadata", this.sendMetaData);
  },
  filters: {
    filterTime(value) {
      if (!value) return '';
      if(value == Date.parse(new Date().toLocaleDateString())){
        return '今天 ' + new Date().toLocaleDateString();
      }
    },
    toUpperCase(value) {
      if (!value) return '';
      
      return value.toUpperCase()
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep.left-menu {
  display: block;
  width: 100%;
  height: 100%;
  .el-collapse-item__content{
    width: 100%;
  }
  .row {
    overflow: hidden;
    width: 95%;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 2px 0 2px 4px;
    .item {
      white-space: nowrap;
    }
    .icom{
      float: right;
      padding: 0 10px;
    }
  }
  
}
</style>


