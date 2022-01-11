const LowDB = require('../data/index');
// import DataBase from './../data/index'
module.exports = (app) => {
    app.post('/list', async function (req, res, next) {
        let result = await LowDB.select();
        res.send({message:'成功',code: 200, data: result})
    })

    app.post('/add', async function (req, res, next) {
        await LowDB.add(req.body);
        // console.log(req.body)
        res.send({message:'成功',code: 200})
    })

    app.post('/delete', async function (req, res, next) {
        await LowDB.delete(req.body);
        res.send({message:'成功',code: 200})

    })
}