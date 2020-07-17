const nodeExternals = require('webpack-node-externals')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const commonConfig = () => ({
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        include: /src/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.tsx', '.json']
  }
})

const serverConfig = {
  ...commonConfig(),
  target: 'node',
  node: {
    __dirname: false
  },
  entry: {
    server: './server'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [nodeExternals()]
}

const clientConfig = {
  ...commonConfig(),
  target: 'web',
  entry: {
    client: './client'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /node_modules/
        }
      }
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
}

module.exports = [serverConfig, clientConfig]
