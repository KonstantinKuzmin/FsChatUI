const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = () => (
		{
				stats: { modules: false },
				devtool: 'source-map',
				resolve: {
						extensions: ['.js', '.ts', '.tsx'],
				},
				output: {
						publicPath: '/assets/',
						filename: 'bundle.js',
				},
				plugins: [new CheckerPlugin(), new ExtractTextPlugin('styles.css')],
				entry: { main: path.join(__dirname, 'src/') },
				module: {
						rules: [
								{ test: /\.tsx?$/, exclude: /node_modules/, use: ['awesome-typescript-loader'] },
								{ test: /\.scss$/, use: ExtractTextPlugin.extract({ use: ['css-loader?minimize', 'sass-loader'] }) },
								{ test: /\.css$/, use: ExtractTextPlugin.extract({ use: ['css-loader?minimize'] }) },
						],
				},
				devServer: {
						contentBase: 'src/',
						host: '0.0.0.0',
						port: 8080,
				},
		}
);
