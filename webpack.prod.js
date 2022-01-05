const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');
const outputFile = '[name].[chunkhash]';
const assetFile = '[contenthash]';

module.exports = () =>
	merge(common(outputFile,assetFile ), {
		mode: 'production',

		plugins:[
			new ESLintPlugin({
				fix: true,
			}),
		],
	});
