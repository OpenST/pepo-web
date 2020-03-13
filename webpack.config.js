const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const devConf = {
  mode: 'none',
  devtool: 'eval-source-map'
};

const prodConf = {
  mode: 'none',
};

module.exports = env => {
  
    const envConf = env.development ? devConf : prodConf;
    
    return {
      ...envConf,
      entry: glob.sync('./assets/src/**.js').reduce((obj, el) => {
        obj[path.parse(el).name] = el;
        return obj;
      },{}),
      output: {
        path: path.resolve(__dirname, './assets/js'),
        filename: '[name].js'
      },
      externals: {
        jquery: 'jQuery'
      },
      node: {
        fs: 'empty'
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env"
                ],
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-transform-async-to-generator",
                  ["@babel/plugin-transform-runtime",
                    {
                      "regenerator": true
                    }
                  ]
                ]
              }
            }
          },
          {
            test: /\.html$/,
            exclude: /node_modules/,
            use: {
              loader: 'html-loader'
            }
          }
        ]
      }
    }

};
