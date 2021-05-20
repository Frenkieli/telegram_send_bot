# telegram_send_bot

紙飛機群發機器人，用來快速轉發一個貼文到下面的所有群組、頻道與個人

這邊主要是單純發送訊息使用，建議拆分到 goolp app script 同時接收與發送訊息還可以隱藏頻道 token、還可以利用 excel 當作資料庫儲存資料

但每個功能都應該分開理解，一次學一個所以先在這邊練習

使用 ngrok 連接到網路

./ngrok http 3000

## 紙飛機機器人指令

https://api.telegram.org/bot1860403762:AAFCvMC4FznJ-fgQ82DA5Bdo_ILD1djXjAE/deleteWebhook

https://api.telegram.org/bot1860403762:AAFCvMC4FznJ-fgQ82DA5Bdo_ILD1djXjAE/setWebhook?url=https://8c2557636f9f.ngrok.io

機器人父親指令

/start

/newbot

/mybots

reply_markup



.env
