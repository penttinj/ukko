module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'xo',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4],
        'capitalized-comments': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'max-len': [
            'warn',
            100, // max line length
            2,
            {
                // ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                // ignoreStrings: true,
                // ignoreTemplateLiterals: true,
            },
        ],
    },
};
