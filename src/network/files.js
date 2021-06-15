import { request } from "./request";

const bucketName = "cain-test"

// get请求方式
export function getFiles(params) {
    return request({
        url: `/MinioFile/files/${bucketName}`,
        method: 'get',
        params
    })
}

// post请求方式
export function setFiles(data) {
    return request({
        url: `/MinioFile/files/${bucketName}`,
        method: 'post',
        data
    })
}