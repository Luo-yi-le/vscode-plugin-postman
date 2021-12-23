<template>
    <div class="main">
        <div class="main-header">
            <el-select size="mini" v-model="method" placeholder="请选择">
                <el-option
                    v-for="item in MethodArray"
                    :key="item.method"
                    :label="item.method"
                    :value="item.method">
                </el-option>
            </el-select>

            <el-input size="mini" v-model="url"></el-input>
            <el-button size="mini" type="primary" @click="handleSend">发送</el-button>
        </div>
        <div class="main-tabs">
            <Tabs @params="handleGetParams" :tabs-data="tabsSetting"></Tabs>
        </div>
    </div>
</template>
<script>
import Tabs from '../tabs';
import { $ajax } from '../../utils/http.js';
import { MethodArray, tabsSetting } from '@/common/';
export default {
    components: {
        Tabs
    },
    data() {
        return {
            MethodArray,
            tabsSetting,
            method: '',
            url: '',
            data: {},
            headers: {}
        }
    },
    mounted() {

    },
    methods: {
        async handleSend() {
            let res = await $ajax(this.method,this.url, this.data, {headers: this.headers})
            this.$bus.emit('json-data', res)
        },
        handleGetParams(params) {
            this.data = params
        }
    }
}
</script>
<style lang="scss" scoped>
.main {
    display: block;
    width: 100%;
    height: 100%;
    line-height: initial;
    .main-header {
        text-align: left;
        display: flex;
    }

    .main-tabs {
        margin-top: 5px;
    }
}
</style>


