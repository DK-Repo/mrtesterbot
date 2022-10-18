const TelegramBot = require("node-telegram-bot-api");

const token = "5507342368:AAEwWndBFT-S7H2Rt37NjNzVmyuZ_eTtzt4";
const webAppUrl = "https://roaring-douhua-e0a2d6.netlify.app/";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка, заполни форму", {
      reply_markup: {
        keyboard: [[{ text: "Заполни форму", web_app: { url: webAppUrl } }]],
      },
    });
    await bot.sendMessage(
      chatId,
      "Заходи в наш интернет магазин по кнопке ниже",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Сделай заказ", web_app: { url: webAppUrl } }],
          ],
        },
      },
    );
  }
  bot.sendMessage(chatId, "Received yout message!");
});
