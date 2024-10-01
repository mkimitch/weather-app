const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const useSSL = process.env.USE_SSL === 'true'

module.exports = merge(common, {
	devServer: {
		allowedHosts: 'all',
		historyApiFallback: { disableDotRule: true },
		host: '0.0.0.0',
		hot: true,
		port: 8080,

		server: useSSL
			? {
					type: 'https',
					options: {
						cert: fs.readFileSync(
							path.resolve(__dirname, 'certs/localhost.crt')
						),
						key: fs.readFileSync(
							path.resolve(__dirname, 'certs/localhost.key')
						),
					},
			  }
			: {
					type: 'http',
			  },
		static: './dist',
	},
	devtool: 'inline-source-map',
	mode: 'development',
})
