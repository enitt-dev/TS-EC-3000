const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: { main: './src/index.ts' },
  devtool: 'source-map',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new NodemonPlugin()],
}
