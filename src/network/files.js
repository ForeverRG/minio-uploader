import { request } from "./request";

// const bucketName = "cain-test"; // 桶名
const bucketName = "test";

// get请求方式
export function getFiles(params) {
  return request({
    url: `api/MinioFile/files/${bucketName}`,
    method: "get",
    params,
  });
}

// post请求方式
export function uploadFiles(data) {
  return request({
    url: `api/MinioFile/Compose`,
    method: "post",
    data,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}

export function getPresignedURL(params) {
  return request({
    // baseURL: "http://10.66.20.15:5688/",
    url: `api/MinioFile/presignedURL`,
    method: "get",
    params,
  });
}
