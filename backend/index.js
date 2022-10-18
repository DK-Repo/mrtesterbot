const TelegramBot = require("node-telegram-bot-api");

const token = "5507342368:AAEwWndBFT-S7H2Rt37NjNzVmyuZ_eTtzt4";
const webAppUrl = "https://roaring-douhua-e0a2d6.netlify.app";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка, заполни форму", {
      reply_markup: {
        keyboard: [
          [{ text: "Заполни форму", web_app: { url: webAppUrl + "/form" } }],
        ],
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
  if (message?.web_app_data?.data) {
    try {
      const data = JSON.parse(message?.web_app_data?.data);

      await bot.sendMessage(chatId, "Спасибо за обратную связь!");
      await bot.sendMessage(chatId, "Ваша страна: " + data?.country);
      await bot.sendMessage(chatId, "Ваша улица: " + data?.street);

      setTimeout(async () => {
        await bot.sendMessage(chatId, "Всю информацию вы получили в этом чате");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }
});
