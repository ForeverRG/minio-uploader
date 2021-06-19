export default {
  // 初始化所有文件列表
  initAllFileList(state, param) {
    state.allFileList = param;
  },
  // 初始化文档列表
  initDocumentList(state, param) {
    state.documentList = param
  },
  // 初始化图片列表
  initImageList(state, param) {
    state.imageList = param
  },
  // 初始化音乐列表
  initMusicList(state, param) {
    state.musicList = param
  },
  // 初始化视频列表
  initVideoList(state, param) {
    state.videoList = param
  },
  // 初始化其他文件列表
  initOtherList(state, param) {
    state.otherList = param
  }
}