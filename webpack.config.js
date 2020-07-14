const { ContextReplacementPlugin } = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new ContextReplacementPlugin(/any-promise/)
  ]
}
