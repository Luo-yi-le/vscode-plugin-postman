const MethodArray = [
    { method: 'get' },
    { method: 'post' },
    { method: 'put' },
    { method: 'patch' },
    { method: 'delete' },
    { method: 'copy' },
    { method: 'head' },
    { method: 'options' },
    { method: 'link' },
    { method: 'unlink' },
    { method: 'purge' },
    { method: 'lock' },
    { method: 'unlock' },
    { method: 'propfind' },
    { method: 'view' },
]

const tabsSetting = [
    {
        label: 'Params', name: 'Params', showTable: true,
        tableHeader: [
            { key: 'KEY', label: "KEY" },
            { key: 'VALUE', label: "VALUE" },
            { key: 'DESCRIPTION', label: "DESCRIPTION" },
        ],
        tableData: [
            { index: 1, KEY: '', VALUE: '' },
        ]
    },
    { label: 'Authorization', name: 'Authorization' },
    {
        label: 'Headers', name: 'Headers', showTable: true,
        tableHeader: [
            { key: 'KEY', label: "KEY" },
            { key: 'VALUE', label: "VALUE" },
            { key: 'DESCRIPTION', label: "DESCRIPTION" },
        ],
        tableData: [
            { index: 1, KEY: '', VALUE: '' },
        ]
    },
    { label: 'Body', name: 'Body' },
    { label: 'Pre-request Script', name: 'Pre-request Script' },
    { label: 'Tests', name: 'Tests' },
    { label: 'Settings', name: 'Settings' },

]

export {
    MethodArray,
    tabsSetting
}