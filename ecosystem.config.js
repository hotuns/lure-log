export const apps = [
    {
        name: 'lurelog',
        port: '3111',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
    }
];
