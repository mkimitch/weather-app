const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/weather-app/',
	},
	resolve: {
		alias: {
			'@styles': path.resolve(__dirname, 'src/styles'),
		},
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true },
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							additionalData: `@import "@styles/mixins.scss";`,
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[hash][ext][query]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			base: '/weather-app/',
			template: './public/index.html',
		}),
		new HtmlWebpackPlugin({
			base: '/weather-app/',
			filename: '404.html',
			template: './public/index.html',
		}),
		new CleanWebpackPlugin(),
		new Dotenv(),
		new CopyWebpackPlugin({
			patterns: [{ from: 'public', to: '' }],
		}),
	],
}
