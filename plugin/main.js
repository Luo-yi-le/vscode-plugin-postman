// @ts-nocheck
const path = require("path");
var child_process = require('child_process');
const filePath = path.dirname(path.join(__dirname));
const www = filePath + '/server/bin/www.js'


/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
function prs() {
    return {
        exit: () => child_process.kill(),
        kill: () => process.kill(),
        fork: (path, option = {}) => child_process.fork(path, option),
        path: www,
        server: child_process
    }
}
exports.activate = function (context) {
    prs().server.fork(www, {
        silent: false
    });
    console.log('扩展已被激活！');
    require('./src/index')(context, prs()); // 欢迎提示
}

// /**
//  * 插件被释放时触发
//  */
exports.deactivate = function () {
    if (!prs().server) {
        return undefined;
    }
    prs().server.kill()
    prs().exit()
};