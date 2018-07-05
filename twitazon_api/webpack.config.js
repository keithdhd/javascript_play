const config = {
  entry: `${__dirname}/client/src/index.js`,
  output: {
    filename: "bundle.js",
    path: `${__dirname}/client/build`
  },
  devtool: "source-map"
}

module.exports = config;
