<template>
    <div class="table">
        <el-table 
          :tableKey="tableKey"
          ref="table"
          highlight-current-row
          v-loading='loading' 
          :data="data" 
          border
          fit
          :cell-class-name="tableCellClassName"
          @row-click="handleRowClick"
          @cell-click="handleCellClick">
          <template v-for="(h, index) in header">
              <el-table-column :key="index" :prop="h.key" :label="h.label">
                  <template slot-scope="scope">
                      <el-input @input="handleInput(scope.row)" @change="handleChange(index)" v-model="scope.row[h.key]"></el-input>
                  </template>
              </el-table-column>
          </template>
        </el-table>
    </div>
</template>
<script>
import _ from "lodash";
import { constants } from 'buffer';
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableHeader: {
      type: Array,
      default: () => {
        return [];
      }
    },
    keyValue: {
      type: Array,
      default: () => {
        return [];
      }
    },
    getData: {
      type: Function,
      default: (done) => done,
    }
  },
  watch: {
    tableData: {
      handler(v) {
        this.$set(this, "data", _.cloneDeep(v));
      },
      deep: true,
      immediate: true
    },
    tableHeader: {
      handler(v) {
        this.$set(this, "header", _.cloneDeep(v));
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      loading: false,
      data: [],
      header: [],
      column: 0,
      tableKey: "tablekey"
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleChange() {
      let obj = {};
      this.data.forEach(item => {
        obj[item.KEY] = item.VALUE;
      });
      this.getData(obj, this.data)
    },
    handleInput({ index }) {
      let arr = _.cloneDeep(this.keyValue); 
      arr[0].index = index +1;
      if (this.data.length == index) {
        this.$set(this, "data", [
          ..._.cloneDeep(this.data),
          ..._.cloneDeep(...[arr])
        ]);
      }
      this.tableKey = this.getID();
    },
    handleCellClick(row, column, cell, event) {
      this.column = column.rowIndex + 1;
    },
    handleRowClick(row, column, event) {},
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      column.rowIndex = rowIndex;
      column.columnIndex = columnIndex;
    },
    getID(length = 16) {
      return Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
      ).toString(36);
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  display: block;
  .c-table {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: #606266;

    .c-table__body-wrapper,
    .c-table__footer-wrapper,
    .c-table__header-wrapper {
      width: 100%;
    }

    .c-table__footer-wrapper,
    .c-table__header-wrapper {
      overflow: hidden;
    }
  }

  .c-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
  }
  .c-table--border::after,
  .c-table--group::after,
  .c-table::before {
    content: "";
    position: absolute;
    background-color: #ebeef5;
    z-index: 1;
  }

  .c-table--fit {
    border-right: 0;
    border-bottom: 0;
  }
  .c-table--border,
  .c-table--group {
    border-right: 0;
    border-bottom: 0;
  }
}
</style>


