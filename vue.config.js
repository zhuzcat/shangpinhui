module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn'
            }
        },
    },
    productionSourceMap: false
}