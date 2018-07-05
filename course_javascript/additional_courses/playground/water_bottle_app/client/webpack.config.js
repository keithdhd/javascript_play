var config = {
  entry: "./source/index.js",
  output: {
    filename: "bundle.js",
    path: "./build"
  },
  devtool: 'source-map'
};

module.exports = config;