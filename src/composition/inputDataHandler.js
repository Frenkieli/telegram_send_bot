import { ref } from "vue";

const defaultButtonData = () => {
  return {
    text: "點選編輯",
    url: "https://bli2d.com/",
  };
};

export default function inputDataHandler() {
  const updataText = ref(null);

  const editInlineButton = ref(null);

  const editInlineButtonData = ref({
    text: null,
    url: null,
  });

  const inlineButtonData = ref([]);

  function addRol() {
    inlineButtonData.value.push([defaultButtonData()]);
  }

  function deleteRow(rowIndex) {
    inlineButtonData.value.splice(rowIndex, 1);
    console.log(inlineButtonData.value, "inlineButtonData.value");
  }

  function addCol(rowIndex) {
    if (inlineButtonData.value[rowIndex].length < 8) {
      inlineButtonData.value[rowIndex].push(defaultButtonData());
    } else {
      console.log("太多了");
    }
  }

  function deleteCol() {
    inlineButtonData.value[editInlineButton.value[0]].splice(
      editInlineButton.value[1],
      1
    );
    if (inlineButtonData.value[editInlineButton.value[0]].length === 0) {
      inlineButtonData.value.splice(editInlineButton.value[0], 1);
    }
    editInlineButton.value = null;
  }

  return {
    updataText,
    editInlineButton,
    editInlineButtonData,
    inlineButtonData,
    addRol,
    deleteRow,
    addCol,
    deleteCol,
  };
}
