export const plugins = [
	require('postcss-sorting')({
		order: [
			'custom-properties',
			'dollar-variables',
			'declarations',
			'rules',
			'at-rules',
		],
	}),
]
