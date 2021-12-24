<template>
    <div class="footer">
      <jv
      :value="jsonData"
      :expand-depth='5'
      :http-config='HttpConfig'
      copyable
      boxed
      sort>
      </jv>
    </div>
</template>
<script>
import jv from "../jsonViewer";
export default {
  components: {
    jv,
  },
  data() {
    return {
      jsonData: {},
      HttpConfig: {},
    };
  },
  mounted() {
    this.loadJsonData()
  },
  methods: {
    loadJsonData() {
      this.$bus.on('json-data',(data)=>{
        this.jsonData = data.data;
        this.HttpConfig = data
      })
    }
  },
  beforDestory () {
    this.$bus.off('json-data', this.loadJsonData)
  }
};
</script>
<style lang="scss" scoped>
.footer {
  display: block;
  overflow-y: hidden;
  height: 100%;

  border: 1px solid #ccc;
  border-top: none;
}
</style>


