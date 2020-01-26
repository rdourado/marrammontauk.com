const path = require('path')
const webpack = require('webpack')
const isWsl = require('is-wsl')
const TerserPlugin = require('terser-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = function(webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development'
	const isEnvProduction = webpackEnv === 'production'

	const getStyleLoaders = (cssOptions, sass = false) =>
		[
			isEnvDevelopment && 'style-loader',
			{ loader: 'css-loader', options: cssOptions },
			{
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: () => [postcssPresetEnv()],
				},
			},
			sass && 'sass-loader',
		].filter(Boolean)

	return {
		mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
		bail: isEnvProduction,
		devtool: isEnvProduction ? false : isEnvDevelopment && 'eval-source-map',
		entry: './source/js/ui.js',
		output: {
			path: path.resolve('assets', 'js'),
			filename: 'bundle.js',
		},
		optimization: {
			minimize: isEnvProduction,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						parse: { ecma: 8 },
						compress: { ecma: 5, warnings: false, comparisons: false, inline: 2 },
						output: { ecma: 5, comments: false, ascii_only: true },
						mangle: { safari10: true },
					},
					parallel: !isWsl,
					cache: true,
					sourceMap: false,
				}),
			],
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		externals: {
			jQuery: 'jQuery',
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: ['babel-loader', 'eslint-loader', 'prettier-loader'],
				},
				{
					test: /\.css$/,
					exclude: /\.module\.css$/,
					use: getStyleLoaders({ importLoaders: 1 }),
				},
				{
					test: /\.s(a|c)ss$/,
					exclude: /\.module\.s(a|c)ss$/,
					use: getStyleLoaders({ importLoaders: 1 }, true),
				},
				{
					test: /\.module\.css$/,
					use: getStyleLoaders({
						importLoaders: 2,
						modules: true,
						localIdentName: '[local]---[hash:base64:5]',
					}),
				},
				{
					test: /\.module\.s(a|c)ss$/,
					use: getStyleLoaders(
						{
							importLoaders: 2,
							modules: true,
							localIdentName: '[local]---[hash:base64:5]',
						},
						true
					),
				},
			],
		},
		plugins: [
			new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(webpackEnv) }),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		].filter(Boolean),
	}
}
