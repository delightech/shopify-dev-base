// コメント記述のためにjsで書く
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    // Airbnbが提供する共有設定。広く使われている
    'airbnb',
    // 各プラグイン推奨共有設定
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    // project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'jest', 'jsx-a11y', 'prefer-arrow', 'react', 'react-hooks'],
  root: true, // 親ディレクトリの設定ファイルを読み込まないように設定
  rules: {
    // オブジェクト内でkeyとvalueの変数が同じ場合でもkeyの記述を省略しない
    'object-shorthand': ['error', 'never'],
    // 関数の中括弧を省略しない
    'arrow-body-style': ['error', 'always'],
    'sort-imports': 'off',
    'newline-before-return': 'warn',
    'no-console': 'warn',
    'no-continue': 'off',
    // シングルクォート指定。文字列中のダブルクォートとテンプレート文字列を許可
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    // ジェネレータ関数のyield省略を禁止
    'require-yield': 'error',
    // セミコロンは常に付与。preitierでフォーマットしてしまうので強制する。
    semi: ['error', 'always'],
    // indent:2。prettierでフォーマットしてしまうので強制する
    indent: ['error', 2],
    // disallow certain syntax forms
    // https://eslint.org/docs/rules/no-restricted-syntax
    // eslint-config-airbnb-base/rules/style.js で定義されている内、for ofのみ除外して定義する
    // for ofを除外すると生産性に影響しそうなので残し、それ以外の設定を引き継ぐ。
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // @typescript-eslint
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/prefer-interface': 'off',

    // prefer-arrow
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: false,
      },
    ],
    // react
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['jsx', 'tsx'],
      },
    ],
    'react/jsx-props-no-spreading': [
      'warn',
      {
        custom: 'ignore',
      },
    ],
    'react/prop-types': 'off',
    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    // import
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', 'jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
