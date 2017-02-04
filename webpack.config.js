var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'sloppy-scroll.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
