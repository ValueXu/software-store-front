// craco.config.js
const CracoLessPlugin = require("craco-less");

// const webpack = require("webpack");
const WebpackBar = require("webpackbar");

module.exports = {
  webpack: {
    plugins: [new WebpackBar()],
  },
  babel: {
    plugins: [
      ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
      // [
      //   "import",
      //   {
      //     libraryName: "@ant-design/icons",
      //     libraryDirectory: "es",
      //     style: "css",
      //   },
      // ],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
