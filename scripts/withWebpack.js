const path = require("path");
const webpack = require("webpack");

const config = {
  mode: "production",
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, "dist/webpack"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};

const fileNames = [
  "../examples/pureJSWithNoDeps/index.js",
  "../examples/withNonESMDeps/index.js",
];
for (file of fileNames) {
  const webpackConfig = {
    ...config,
    entry: file,
    output: { ...config.output, filename: `${file.split("/")[2]}.bundle.js` },
  };
  webpack(webpackConfig).run();

  // with minification
  const withMinimizeConfig = {
    ...webpackConfig,
    optimization: { minimize: true },
    output: {
      ...config.output,
      filename: `${file.split("/")[2]}.bundle.min.js`,
    },
  };
  webpack(withMinimizeConfig).run();
}
