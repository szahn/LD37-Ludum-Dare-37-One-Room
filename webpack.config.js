module.exports = {
  entry: "./src/index.ts",
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  watch: true,
  devtool: 'source-map',
  output: {
      path: __dirname + "/dist",
      filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};