import ljharb from '@ljharb/eslint-config/flat';

export default [
	...ljharb,
	{
		rules: {
			'id-length': [
				'error', {
					max: 22,
					min: 1,
					properties: 'never',
				},
			],
			'no-extra-parens': 'off',
			'no-magic-numbers': 'off',
			'symbol-description': 'off',
		},
	},
	{
		files: ['test/**'],
		rules: {
			'consistent-return': 'warn',
			'no-invalid-this': 'off',
		},
	},
];
