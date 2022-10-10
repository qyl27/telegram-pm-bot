import TelegramBot from "node-telegram-bot-api";
import {TG_TOKEN} from "./_config";

let tgBot: TelegramBot;

if (process.env.NODE_ENV === "development") {
    if (!global._tgBot) {
        global._tgBot = new TelegramBot(TG_TOKEN);
    }
    tgBot = global._tgBot;
} else {
    tgBot = new TelegramBot(TG_TOKEN);
}

tgBot.onText(/\/echo/, async (msg, match) => {
    await tgBot.sendMessage(msg.chat.id, msg.text);
});

export default tgBot;
