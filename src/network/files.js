import { request } from "./request";

const bucketName = "cain-test"  // 桶名

// get请求方式
export function getFiles(params) {
    return request({
        url: `api/MinioFile/files/${bucketName}`,
        method: 'get',
        params
    })
}

// post请求方式
export function uploadFiles(data) {
    return request({
        url: `api/MinioFile/Compose`,
        method: 'post',
        data,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
    })
}