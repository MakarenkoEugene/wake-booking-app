module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel',
  ],
  env: {
    production: {
      only: ['src'],
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
  },
};
