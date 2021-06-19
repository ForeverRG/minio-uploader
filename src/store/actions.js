import { getFiles } from "../network/files";

export default {
  // 获取所有文件
  getAllFileList(context) {
    getFiles().then(res => context.commit("initAllFileList", res.data))
  }
}