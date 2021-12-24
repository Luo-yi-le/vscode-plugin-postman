<template>
    <div class="main">
        <div class="main-header">
            <el-select size="mini" @change="handleChangeMethod" v-model="getMethod" placeholder="请选择">
                <el-option
                    v-for="item in MethodArray"
                    :key="item.method"
                    :label="item.method"
                    :value="item.method">
                </el-option>
            </el-select>

            <el-input size="mini" v-model="getUrl" @change="handleChange"></el-input>
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
import { HandleStoreAction } from '@/mixins/handleStoreAction';
import { LStorage } from '@/utils/Store'
export default {
    components: {
        Tabs
    },
    mixins:[ HandleStoreAction ],
    data() {
        return {
            MethodArray,
            tabsSetting,
            getMethod: '',
            getUrl: '',
            data: {},
            headers: {},
            params: [],
            lock: false
        }
    },
    mounted() {
        this.takeMetadataRow()
    },
    methods: {
        handleSend() {
            let data ={
                method: this.getMethod,
                url: this.getUrl,
                data: this.params,
                headers: this.headers,
                status: 200,
                lock: true // 加锁
            }
            $ajax(this.getMethod, this.getUrl, this.data, {headers: this.headers})
            .then(res=>{
                 this.$bus.emit('json-data', res);
                 data.status = res.status
            }).catch(error=>{
                data.status = error.status
            })
            
            !this.lock && this.save(data);
        },
        handleGetParams(params, data) {
            this.data = params;
            this.params = data
        },
        handleChangeMethod(method) {
            this.SET_METHOD(method)
        },
        handleChange(url) {
            this.SET_METHOD_URL(url)
        },
        save(data) {
            let obj = {
                time: Date.parse(new Date().toLocaleDateString()),
                data: []
            }
            obj.data.unshift(data)
            let metadata = JSON.parse(LStorage.getItem('metadata'));
            if(metadata && metadata.length) {
                metadata.forEach(item => {
                    if(item.time == Date.parse(new Date().toLocaleDateString())){
                        item.data.unshift(data)
                    }else {
                        metadata.unshift(obj)
                    }
                });
                LStorage.setItem('metadata', metadata);
            } else {
                let array = [];array.unshift(obj);
                LStorage.setItem('metadata', array);
            }
            
            this.$bus.emit('send-metadata', true)
        },

        takeMetadataRow() {
            this.$bus.on('send-metadata-row', (row)=> {
                this.getMethod = row.method;
                this.getUrl = row.url;
                this.lock = row.lock
                this.tabsSetting.forEach(item=>{
                    if(item.name == 'Params' && row.data && row.data[0] && row.data[0].index) {
                        item.tableData = row.data
                    } else {
                        item.tableData = [ { index: 1, KEY: '', VALUE: '' }, ]
                    }
                })
            })
        }
        
    },
    beforDestory() {
        this.$bus.off("send-metadata-row", this.takeMetadataRow);
    },
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


