const nodeExternals = require('webpack-node-externals')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonConfig = () => ({
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)?$/,
        use: 'ts-loader',
        include: /src/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
})

const serverConfig = {
  ...commonConfig(),
  target: 'node',
  entry: {
    server: './src/server'
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
  externals: [nodeExternals()]
}

const clientConfig = {
  ...commonConfig(),
  target: 'web',
  entry: {
    client: './src/client'
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/assets/index.html'
    })
  ]
}

module.exports = [serverConfig, clientConfig]
