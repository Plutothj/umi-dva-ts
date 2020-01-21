import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/
const routes = require('./src/routers/router')
const config: IConfig = {
  treeShaking: true,
  routes: routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'umi',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'https://firm.starday.shop/',
      pathRewrite: {
        '^/api': '/api',
      },
      changeOrigin: true,

    },
  },
  history: 'browser',
};
export default config;

