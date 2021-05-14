import { ref } from "vue";

export default function filesHandler() {
  /** @type {{array}}} */
  const emojiList = ref({
    face: ["🥺", "😂", "😊", "🥰", "😍"],
    icon: ["❤️", "✨", "🔥", "✔️", "👍", "💋", "👉"],
  });

  /** @type {[object]} */
  const chartList = [
    {
      id: 1213797612,
      title: "個人frenkie",
    },
    // {
    //   id: -510921927,
    //   title: '測試群組'
    // },
    // {
    //   id: -1001184977764,
    //   title: '測試頻道'
    // },
  ];

  return {
    chartList,
    emojiList,
  };
}
