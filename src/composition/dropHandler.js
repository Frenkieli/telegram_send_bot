import { ref } from "vue";

export default function filesHandler(callBack) {
  const areaDropState = ref(false);

  function areaDragenterHandler() {
    areaDropState.value = true;
  }
  function areaDragleaveHandler() {
    areaDropState.value = false;
  }

  function areaDropHandler(e) {
    areaDropState.value = false;
    callBack(e.dataTransfer.files);
  }

  return {
    areaDropState,
    areaDragenterHandler,
    areaDragleaveHandler,
    areaDropHandler
  };
}
