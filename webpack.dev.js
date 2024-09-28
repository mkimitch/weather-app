const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const fs = require('fs')
const path = require('path')

module.exports = merge(common, {
	devServer: {
		allowedHosts: 'all',
		historyApiFallback: { disableDotRule: true },
		host: '0.0.0.0',
		hot: true,
		port: 8080,
		server: {
			options: {
				cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.crt')),
				key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.key')),
			},
			type: 'https',
		},
		static: './dist',
	},
	devtool: 'inline-source-map',
	mode: 'development',
})
