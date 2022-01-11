/* eslint-disable no-undef */
window.parent['__vscode_post_message__'] = () => { };

const originalPostMessage = window.parent['__vscode_post_message__'].bind(window.parent);

const doPostMessage = (channel, data, transfer) => {
    originalPostMessage(channel, data, transfer);
};
export const vscode =(()=> {

    let acquired = false;

    let state = undefined;

    return (() => {
        if (acquired && !false) {
            throw new Error('An instance of the VS Code API has already been acquired');
        }
        acquired = true;
        return Object.freeze({
            postMessage: function (message, transfer) {
                doPostMessage('onmessage', { message, transfer }, transfer);
            },
            setState: function (newState) {
                state = newState;
                doPostMessage('do-update-state', JSON.stringify(newState));
                return newState;
            },
            getState: function () {
                return state;
            }
        });
    })();
})()