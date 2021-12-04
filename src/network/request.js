import axios from "axios";

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://192.168.25.58:5001/', // 测试服务器地址
    baseURL: "http://10.66.20.15:5688/", // 本地测试地址
    timeout: 5000,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 拦截后需要将拦截下来的请求数据返回发送
      return config;
    },
    (err) => {
      console.log(err);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      // 拦截后需要将拦截下来处理成的结果返回
      return res.data;
      // return res;
    },
    (err) => {
      console.log(err);
    }
  );

  return instance(config);
}
