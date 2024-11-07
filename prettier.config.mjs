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
	// printWidth: 120, // readed from .editorconfig
	// useTabs: true, // readed from .editorconfig
	// tabWidth: 2, // readed from .editorconfig
}

export default config
