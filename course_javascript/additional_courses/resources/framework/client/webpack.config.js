module.exports = {
  entry: "./scripts/app.js",
  output: {
    filename: "../public/bundle.js",
  },
  module: {
    loaders: [
      { test: /\.handlebars$/, loader: "handlebars-loader" }
    ]
  }
}
