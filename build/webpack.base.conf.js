"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: ["babel-polyfill", "./src/js/main.js"]
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath:
            process.env.NODE_ENV === "production"
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            "@js": resolve("src/js"),
            "@images": resolve("src/assets/images"),
            "@components": resolve("src/js/components"),
            "@layouts": resolve("src/js/layouts"),
            "@styles": resolve("src/scss"),
            "@config": resolve("src/js/config"),
            "@helpers": resolve("src/js/helpers"),
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint
                ? [
                      {
                          test: /\.(js|vue)$/,
                          loader: "eslint-loader",
                          enforce: "pre",
                          include: [resolve("src"), resolve("test")],
                          options: {
                              formatter: require("eslint-friendly-formatter"),
                              emitWarning: !config.dev.showEslintErrorsInOverlay
                          }
                      }
                  ]
                : []),
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolve("src"), resolve("test")]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
        ]
    }
};
