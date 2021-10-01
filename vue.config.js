module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,
	devServer: {
        port: 3031,
	},

    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/'
}
