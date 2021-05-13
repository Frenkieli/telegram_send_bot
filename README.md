# telegram_send_bot
紙飛機群發機器人，用來快速轉發一個貼文到下面的所有群組、頻道與個人

這邊主要是單純發送訊息使用，建議拆分到 goolp app script 同時接收與發送訊息還可以隱藏頻道token、還可以利用excel當作資料庫儲存資料

但每個功能都應該分開理解，一次學一個所以先在這邊練習

使用ngrok連接到網路

./ngrok http 3000

## 紙飛機機器人指令

https://api.telegram.org/bot1860403762:AAFZ2aoOtL__jJd_0vmvX8Crz0C_U5G3vgc/deleteWebhook

https://api.telegram.org/bot1860403762:AAFZ2aoOtL__jJd_0vmvX8Crz0C_U5G3vgc/setWebhook?url=https://ae45c8466176.ngrok.io