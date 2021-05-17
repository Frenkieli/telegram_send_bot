import { ref } from "vue";

export default function filesHandler() {
  /** @type {{array}}} */
  const emojiList = ref({
    face: ["🥺", "😂", "😊", "🥰", "😍"],
    icon: ["❤️", "✨", "🔥", "✔️", "👍", "💋", "👉"],
  });

  /** @type {[object]} */

  const chartList = JSON.parse(process.env.VUE_APP_CHANNELLIST);

  return {
    chartList,
    emojiList,
  };
}
