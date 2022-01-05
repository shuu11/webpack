module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		sourceType: 'module',
	},
	globals: {
		jQuery: 'readonly',
		$: 'readonly',
	},
	extends: ['eslint:recommended', 'prettier'],
}
