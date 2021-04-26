// craco.config.js
const CracoLessPlugin = require("craco-less");

// const webpack = require("webpack");
const WebpackBar = require("webpackbar");

const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar(),
      new MomentLocalesPlugin({ localesToKeep: ["zh-CN", "es-us"] }),
    ],
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
