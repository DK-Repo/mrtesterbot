const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const token = "5507342368:AAEwWndBFT-S7H2Rt37NjNzVmyuZ_eTtzt4";
const webAppUrl = "https://roaring-douhua-e0a2d6.netlify.app";
const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

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

app.post("/web-data", async (req, res) => {
  const { queryId, products, totalPrice } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Успешная покупка",
      input_message_content: {
        message_text:
          "Поздравляю с покупкой, вы приоблели товар на сумму " + totalPrice,
      },
    });
    return res.status(200).json({});
  } catch (error) {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Не удалось приобрести товар",
      input_message_content: {
        message_text: "Не удалось приобрести товар",
      },
    });
    return res.status(500).json({});
  }
});

const PORT = 8000;
app.listen(PORT, () => console.log("Server started on PORT " + PORT));
