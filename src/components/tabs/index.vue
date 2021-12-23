<template>
    <div class="tabs">
        <el-tabs v-model="activeValue" @tab-click="handleClick">
            <template v-for="(tabs, index) in tabsData">
                <el-tab-pane :label="tabs.label" :name="tabs.name" :key="index">
                    <Table :get-data="getData" :keyValue="keyValue" v-if="tabs.showTable" :tableData="tabs.tableData" :tableHeader="tabs.tableHeader"></Table>
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>
<script>
import Table from './../table';
export default {
    components: {
        Table
    },
    props: {
        tabsData: {
            type: Array,
            default:()=>[]
        }
    },
    data() {
        return {
            activeValue: '',
            keyValue: [{KEY:'', VALUE:''}]
        }
    },
    mounted() {},
    methods: {
        handleClick({ name, label }, event) {
        },
        getData(res) {
            let obj = {};
            for(let key in res){
                if(key) {
                    obj[key] = res[key]
                }
            }
            this.$emit('params', obj)
        }
    }
}
</script>
<style lang="scss" scoped>
.tabs {
    display: block;
}
</style>


