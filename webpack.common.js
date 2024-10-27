const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const Dotenv = require( 'dotenv-webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve( __dirname, 'dist' ),
		publicPath: '/weather-app/',
	},
	resolve: {
		alias: {
			'@styles': path.resolve( __dirname, 'src/styles' ),
		},
		extensions: [ '.ts', '.tsx', '.js' ],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [ 'babel-loader', 'ts-loader' ],
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
						options: { sourceMap: true },
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							additionalData: `@use "@styles/mixins" as mixins;`,
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
		new CleanWebpackPlugin(),
		new Dotenv(),
		new HtmlWebpackPlugin( {
			base: '/weather-app/',
			template: './templates/index.html',
			filename: 'index.html',
			inject: true,
		} ),
		new HtmlWebpackPlugin( {
			base: '/weather-app/',
			template: './templates/index.html',
			filename: '404.html',
			inject: true,
		} ),
		new CopyWebpackPlugin( {
			patterns: [
				{ from: 'public', to: '', filter: ( resourcePath ) => !resourcePath.endsWith( 'index.html' ) },
			],
		} ),
	],
};
