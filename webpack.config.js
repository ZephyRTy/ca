const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	target: 'web',
	mode: 'development',
	entry: { app: './src/index.ts' },
	devtool: 'inline-source-map',
	devServer: {
		hot: true,
		port: 5000,
		open: true
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader' // 可以把css放在页面上
					},
					{
						loader: 'css-loader' // 放在后面的先被解析
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.html')
		})
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css']
	}
};
