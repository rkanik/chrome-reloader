const path = require('path');

module.exports = {
	entry: {
		app: './src/app.ts',
		background: "./src/background.ts"
	},
	mode: 'production',
	// watch: true,
	watchOptions: {

	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, './src/'),
			"@@": path.resolve(__dirname, './common/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './build'),
	},
};