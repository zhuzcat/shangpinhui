module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': {
                target: 'http://39.98.123.211'
            }
        },
    },
    productionSourceMap: false
}