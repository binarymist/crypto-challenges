module.exports = {
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': ['error', 'never'],

    // specify the maximum length of a line in your program
    // http://eslint.org/docs/rules/max-len
    'max-len': ['error', 200, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }],
    // enforce consistent line breaks inside function parentheses
    // https://eslint.org/docs/rules/function-paren-newline
    'function-paren-newline': ['error', 'multiline'],
    // Eslint can't deal with ESM modules currently.
    'import/no-unresolved': ['error', { ignore: ['ava', 'chalk', 'got', 'purpleteam-logger'] }],
    // Used in order to supress the errors in the use of appending file extensions to the import statement for local modules
    // Which is required in order to upgrade from CJS to ESM. At time of upgrade file extensions have to be provided in import statements.
    'import/extensions': ['error', { 'js': 'ignorePackages' }],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'object-curly-newline': ['error', { multiline: true }],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 1 }]
  },
  env: { node: true, 'es2021': true },
  parserOptions: { sourceType: 'module', ecmaVersion: 'latest' }
};
