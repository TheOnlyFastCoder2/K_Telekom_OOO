const path = require('path');
const { merge } = require('webpack-merge');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = merge(defaultConfig, {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
      new MiniCSSExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
      }),
  ],
});