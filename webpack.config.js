var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './scripts/index.js']
  },

  output: {
    path: './public/built',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },

  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },
  devtool: 'source-map',

  target: 'electron',
  // target: 'electron-renderer',
  // target: 'atom',
  // target: 'electron-main',
  module: {
    // loaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/,
    //     query: {
    //       presets: ['react', 'es2015']
    //     }
    //   },
    //   { test: /\.css$/, loader: 'style-loader!css-loader' },
    //   { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    // ]
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015']
      }
    },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {
      test: /\.json?$/,
      loader: 'json'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
  ]
}
