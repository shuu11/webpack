const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const outputFile = '[name]';
const assetFile = '[name]';

const bs = {
	startPath: './dist/index.html',
};

module.exports = () =>
	merge(common(outputFile, assetFile), {
		mode: 'development',
		devtool: 'source-map',
		// watch:true,

		plugins: [
			new BrowserSyncPlugin({
				server: {
					baseDir: './',
				},
				startPath: bs.startPath,
				port: 3000,
				notify: false,
				open: 'external',
			}),
		],
	});
