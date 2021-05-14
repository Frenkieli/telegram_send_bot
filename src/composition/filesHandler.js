import { ref } from "vue";

export default function filesHandler() {
  /** @type {FileList} 初始值是普通的array*/
  const storageFiles = ref([]);

  /**
   * @description 用來將檔案儲存到storageFiles並驗證
   *
   * @param { FileList } files e.target.files
   * @return {*} 回傳布林值通知是否正確儲存
   */
  const setStorageFiles = function(files) {
    let sizeLimit = 52428800; // 50MB
    let totalSize = 0;
    let data;

    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }
    if (totalSize >= sizeLimit || files.length > 10) {
      data = {
        code: 0,
        payload:
          totalSize >= sizeLimit ? "檔案大小超過50MB" : "檔案數量超過10個",
      };
    } else {
      data = {
        code: 1,
        data: {
          size: totalSize,
          amount: files.length,
        },
      };
    }
    storageFiles.value = files;

    return data;
  };

  return {
    storageFiles,
    setStorageFiles,
  };
}
