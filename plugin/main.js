// @ts-nocheck
// import vscode from 'vscode';

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */

exports.activate = function (context) {
    console.log('扩展已被激活！');
    require('./src/index')(context); // 欢迎提示
}

/**
 * 插件被释放时触发
 */
 exports.deactivate = function() {
    console.log('扩展已被释放！')
};