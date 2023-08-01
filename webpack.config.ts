module.exports = {
  // outras configurações do Webpack...
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /vitest/,
        // outras configurações da regra...
      },
      // outras regras...
    ],
  },
  // outras configurações do Webpack...
};
