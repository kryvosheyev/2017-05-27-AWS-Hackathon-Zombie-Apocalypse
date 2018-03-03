module.exports = {
  target: 'node',
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ],
  },
  externals: [/aws-sdk/],
};
