const PROXY_CONFIG = [
    {
        context: [
            "/api/**"
        ],
        target: "http://laroute.ddns.net:8088/",
        secure: false,
        logLevel: "debug",
        pathRewrite: {
            "^/api": ""
        },
        changeOrigin: true
    },
    {
        context: [
            "/ressources/**"
        ],
        target: "http://ressources-laroute.ddns.net:8080/",
        secure: false,
        logLevel: "debug",
        pathRewrite: {
            "^/api": ""
        },
        changeOrigin: true
    }
];

module.exports = PROXY_CONFIG;