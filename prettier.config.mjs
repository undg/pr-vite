// @ts-check

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	arrowParens: 'avoid',
	bracketSameLine: false,
	bracketSpacing: true,
	jsxSingleQuote: true,
	plugins: ['prettier-plugin-tailwindcss'],
	quoteProps: 'as-needed',
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
}

export default config
