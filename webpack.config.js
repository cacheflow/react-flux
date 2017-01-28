var webpack = require('webpack')


module.exports = {
  entry: "./react-again.js",
  target: 'node',
  output: {
    path: 'public/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ["transform-react-jsx", {
              "pragma": "dom"
            }]
          ],
          presets: [
            ["es2015", { "loose": true, "modules": false }]
          ]
        }
      }
    ]
  }
};


// module.exports = {
//   entry: "./dispatcher.js",
//   target: 'node',
//   output: {
//     path: 'public/',
//     filename: "bundle.js"
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js?$/,
//         loader: 'babel-loader',
//         query: {
//           presets: [
//             ["es2015", { "loose": true, "modules": false }]
//           ]
//         }
//       }
//     ]
//   }
// };
