import { getFiles, getPresignedURL } from "../network/files";

export default {
  // 获取所有文件
  getAllFileList(context) {
    return new Promise((resolve) => {
      getFiles().then((res) => {
        context.commit("initAllFileList", res.data);
        resolve(res);
      });
    });
  },
  // 获取预签名url，并将预签名返回
  getPresignedURL(context, payload) {
    return new Promise((resolve) => {
      getPresignedURL(payload).then((res) => {
        context.commit("setPresignedURL", res.data.presignedURL);
        resolve(res.data.presignedURL);
      });
    });
  },
};
