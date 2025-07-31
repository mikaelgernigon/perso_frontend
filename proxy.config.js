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
        target: "https://ressources-laroute.ddns.net:8080/",
        secure: true,
        logLevel: "debug",
        pathRewrite: {
            "^/ressources": ""
        },
        changeOrigin: true
    },
    {
        context: [
            "/keycloak/**"
        ],
        target: "https://laroute.ddns.net:8443/",
        secure: true,
        logLevel: "debug",
        pathRewrite: {
            "^/keycloak": ""
        },
        changeOrigin: true
    }
];

module.exports = PROXY_CONFIG;