const { merge } = require( 'webpack-merge' )
const common = require( './webpack.common.js' )
const fs = require( 'fs' )
const path = require( 'path' )
const dotenv = require( 'dotenv' )
const BundleAnalyzerPlugin =
	require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin

dotenv.config()

const useSSL = process.env.USE_SSL === 'true'
const enableBundleAnalyzer = process.env.BUNDLE_ANALYZE === 'true'

module.exports = merge( common, {
	devServer: {
		allowedHosts: 'all',
		historyApiFallback: {
			disableDotRule: true,
		},
		host: '0.0.0.0',
		hot: true,
		port: 8080,
		server: useSSL
			? {
				type: 'https',
				options: {
					cert: fs.readFileSync(
						path.resolve( __dirname, 'certs/localhost.crt' )
					),
					key: fs.readFileSync(
						path.resolve( __dirname, 'certs/localhost.key' )
					),
				},
			}
			: {
				type: 'http',
			},
		static: './dist',
		setupMiddlewares: ( middlewares, devServer ) => {
			if ( !devServer?.app ) return middlewares

			devServer.app.get( '/weather-app', ( _req, res ) => {
				res.redirect( '/' )
			} )

			return middlewares
		},
	},
	devtool: 'eval-source-map',
	mode: 'development',
	output: {
		publicPath: '/',
	},
	plugins: [
		...( enableBundleAnalyzer
			? [
				new BundleAnalyzerPlugin( {
					// analyzerMode: 'server',
					analyzerMode: 'static',
					openAnalyzer: true,
					reportFilename: 'bundle-report.html',
				} ),
			]
			: [] ),
	],
} )
