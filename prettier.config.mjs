/**
 * @type {import(prettier).Config}
 */
const config = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  arrowParens: 'always',
  jsxSingleQuote: false,
  printWidth: 120,
  plugins: ['prettier-plugin-astro'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
}

export default config
