const path = require('path')
const Low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodash = require('lodash');
const LowDB = {
    async getID(length = 16) {
        return Number(
            Math.random()
                .toString()
                .substr(3, length) + Date.now()
        ).toString(36);
    },
    async init() {
        let p = path.join(path.resolve('./') + '/server/data/index.json');
        const adapter = new FileSync(p, {
            // serialize: (data) => JSON.stringify(data),
            // deserialize: (data) => JSON.parse(data)
        });
        const db = new Low(adapter)
        await db.read();
        await db.defaults({ metadata: [] }).write()
        return db;
    },

    async add(d) {
        let d_clone = Object.assign({}, d, { id: await this.getID() });
        let new_obj = {
            time: Date.parse(new Date().toLocaleDateString()),
            data: []
        }
        let db = await this.init();

        let md = await db.get('metadata').find({ time: Date.parse(new Date().toLocaleDateString()) }).value();
        if(md) {
            // await db.get('metadata').unshift(d_clone).write();
            md.data.unshift(d_clone);
            db.write()
        }else {
            new_obj.data.unshift(d_clone)
            await db.get('metadata').unshift(new_obj).write();
        }
        
        return;
        let metadata = await db.get('metadata').value();
        let obj = {
            time: Date.parse(new Date().toLocaleDateString()),
            data: []
        }
        obj.data.unshift(d_clone);
        if (metadata && metadata.length) {
            metadata.forEach(async (item,index) => {
                if (item.time == Date.parse(new Date().toLocaleDateString())) {
                    metadata[index]['data'].unshift(d_clone);
                    await db.write()
                    return false;
                } else {
                    metadata.unshift(obj);
                    await db.write()
                    return false;
                }
            });
            
        } else {
            // 设置数据 
            metadata.unshift(obj);
            await db.write()
        }
    },

    async select(d) {
        let db = await this.init();
        let result = await db.get('metadata').value();
        return result;
    },
    async update(d) {
        await this.init(d);
        
    },

    async delete(d) {
        let db = await this.init();
        let metadata = await db.get('metadata').value();
        if (metadata && metadata.length) {
            lodash.remove(metadata, (item) => {
                if (d.time && d.id) {
                    lodash.remove(item.data, (__j) => __j.id == d.id)
                } else if (d.time && !d.id) {
                    return item.time == d.time
                }
            });
            db.write();
        }

    }
}

let params = {
    data: [],
    headers: [],
    lock: true,
    method: "post",
    status: undefined,
    url: "https://gitee.com/mirrors/LowDB/events.json3",
}

let params2 = {
    time: 1641484800000,

}

LowDB.add(params)
// LowDB.select(params).then(res=>{
//     console.log(JSON.stringify(res))
// })
module.exports = LowDB;