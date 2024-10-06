const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
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
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/,
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
							sourceMap: true,
							additionalData: `@import "@styles/mixins.scss";`,
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
	],
}
