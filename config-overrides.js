const { override, fixBabelImports, addWebpackAlias, adjustStyleLoaders } = require('customize-cra');
const path = require("path");

 module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src")
    }),
    adjustStyleLoaders(rule => {
        if(rule.test.toString().includes('scss')) {
            rule.use.push({
                loader: require.resolve('sass-resources-loader'),
                options: {
                    resources: './src/assets/css/var.scss'
                }
            })
        }
    }),
 );