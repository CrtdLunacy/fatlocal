module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
        'lunacy-plugin',
        'unused-imports',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] }],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': ['warn', {
            custom: 'ignore',
        }],
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'warn',
        'no-underscore-dangle': 'off',
        'max-len': ['error', { ignoreComments: true, code: 140 }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'lunacy-plugin/path-checker': ['error', {
            alias: '@',
        }],
        'lunacy-plugin/layer-imports': ['error', {
            alias: '@',
            ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
        }],
        'lunacy-plugin/public-api-imports': ['error', {
            alias: '@',
        }],
        'unused-imports/no-unused-imports': 'error',
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __APP_URL__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.test.{ts, tsx}'],
            rules: {},
        },
    ],
};
