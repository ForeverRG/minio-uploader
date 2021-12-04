module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Range Minio";
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  //devServer.proxy适用于本地开发使用，
  //生成环境请用第三方代理软件，如nginx。
  devServer: {
    port: 8080, //本机端口号
    host: "0.0.0.0", //本机主机名
    https: false, //协议
    open: true, //启动服务器时自动打开浏览器访问
    proxy: {
      "/api": {
        target: "http://10.66.20.15:5688",
        changOrigin: true, //开启代理
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
