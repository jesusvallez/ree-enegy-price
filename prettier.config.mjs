/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  arrowParens: 'always',
  jsxSingleQuote: false,
  printWidth: 120,
  tailwindStylesheet: './src/styles/global.css',
  tailwindFunctions: ['class', 'className', 'ngClass', 'class:list', '.*Cn'],
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
}

export default config
