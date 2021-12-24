<template>
    <div class="left-menu">
        <el-collapse accordion>
            <template v-for="(meta, index) in metadata">
                <el-collapse-item :key="index">
                    <template slot="title">
                        <span>{{meta.time | filterTime}}</span>
                        <span class="icon" @click="handleDelete(index)"><i class="el-icon-delete"></i></span>
                    </template>
                    <template v-for="(data, $index) in meta.data">
                      <div class="content" :key="$index">
                        <div :title="data.url" class="row">
                          <span class="item" @click="handleClick(data)">{{data.method | toUpperCase}} {{data.url}}</span>
                        </div>
                        <div class="icom" @click="handleDelete(index, data, $index)"><i class="el-icon-delete"></i></div>
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
    },
    sendMetaData() {
      this.$bus.on("send-metadata", flag => {
        console.log(flag)
        if (flag) {
          this.init();
        }
      });
    },
    handleClick(row) {
      this.$bus.emit("send-metadata-row", row)
    },
    handleDelete(index, data, data_index) {
      if(data && data_index) {
        this.$delete(this.metadata[index].data, data_index);
      }else {
        this.$delete(this.metadata, index);
      }
      
      LStorage.setItem("metadata", this.metadata)
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
      };
      return new Date().toLocaleDateString();
    },
    toUpperCase(value) {
      if (!value) return '';
      return value.toUpperCase();
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep.left-menu {
  display: block;
  width: 100%;
  height: 100%;
  .el-collapse-item__header{
    position: relative;
    justify-content: right;
    .icon{
      position: absolute;
      margin-right: 30px;
    }
  }
  .el-collapse-item__content{
    width: 100%;
  }
  .content{
    display: flex;
    align-items: center;
    justify-content: space-around;

    .icom{
      float: right;
      padding: 0 10px;
    }
  }

  .row {
    overflow: hidden;
    width: 85%;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 2px 0 2px 4px;
    .item {
      white-space: nowrap;
    }
    .item:hover{
      cursor: pointer;
    }
    
  }
  
}
</style>


