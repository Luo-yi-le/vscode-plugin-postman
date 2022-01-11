<template>
    <div class="left-menu">
        <el-collapse accordion>
            <template v-for="(meta, index) in metadata">
                <el-collapse-item :key="index">
                    <template slot="title">
                        <span class="time">{{meta.time | filterTime}}</span>
                        <span class="icon" @click="handleDelete(meta.time)"><i class="el-icon-delete"></i></span>
                    </template>
                    <template v-for="(data, $index) in meta.data">
                      <div class="content" :key="$index">
                        <div :title="data.url" class="row">
                          <span class="item" @click="handleClick(data)">{{data.method | toUpperCase}} {{data.url}}</span>
                        </div>
                        <div class="icom" @click="handleDelete(meta.time, data.id)"><i class="el-icon-delete"></i></div>
                      </div>
                    </template>
                </el-collapse-item>
            </template>
            
        </el-collapse>
    </div>
</template>
<script>
import { $ajax } from '@/utils/http.js';
export default {
  data() {
    return {
      metadata: []
    };
  },
  async mounted() {
    await this.init();
    this.sendMetaData();
  },
  methods: {
    async init() {
      let result = await $ajax('post', 'http://127.0.0.1:32333/list', {})
      if(result.data.code == 200) {
        this.metadata = result.data.data;
      }
    },
    sendMetaData() {
      this.$bus.on("send-metadata", async(flag) => {
        if (flag) {
          await this.init();
        }
      });
    },
    handleClick(row) {
      this.$bus.emit("send-metadata-row", row)
    },
    async handleDelete(time, id) {
      if(time && id) {
        await $ajax('post', 'http://127.0.0.1:32333/delete', {time, id})
      }else {
        await $ajax('post', 'http://127.0.0.1:32333/delete', {time})
      }
      await this.init()
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
      return new Date(value).toLocaleDateString();
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
    .time {
      padding-left: 10px;
    }
    .icon{
      right: 0;
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


