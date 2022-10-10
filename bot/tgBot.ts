import TelegramBot, {Message, SendMessageOptions} from "node-telegram-bot-api";
import {TG_TOKEN} from "./config";

class TgBot {
    bot: TelegramBot;

    constructor(token: string) {
        this.bot = new TelegramBot(token, {polling: false, webHook: false});

        this.bot.onText(/\/echo/, (msg, match) => this.onEchoEmpty(msg, match));
        this.bot.onText(/\/echo (.+)/, (msg, match) => this.onEcho(msg, match));

        this.bot.onText(/\/start/, (msg, match) => this.onStart(msg, match));
        this.bot.on('text', msg => this.onReply(msg))
    }

    public processUpdate(body: any) {
        this.bot.processUpdate(body);
    }

    public onEchoEmpty(message: Message, matches: RegExpExecArray) {
        this.replyTo(message.chat.id, message.message_id, "我应该说些什么呢？");
    }

    public onEcho(message: Message, matches: RegExpExecArray) {
        this.replyTo(message.chat.id, message.message_id, matches[1]);
    }

    public onStart(message: Message, matches: RegExpExecArray) {
        this.replyTo(message.chat.id, message.message_id, "欢迎联系私聊 Bot ，我已经打开了一条转发通道至我的 Owner 。\n回复这条消息就可以开始私聊了。");
    }

    public onReply(message: Message) {
        if (message.reply_to_message) {
            let cursor = message.reply_to_message;
            let depth = 1;
            while (cursor.reply_to_message) {
                cursor = cursor.reply_to_message;
                depth += 1;
            }

            let root = cursor;
            if (root.text === '/start') {
                // Todo
            }
        }
    }

    public sendMessage(chatId: number, text: string) {
        this.sendMessageInternal(chatId, text, 0);
    }

    public replyTo(chatId: number, replyId: number, text: string) {
        this.sendMessageInternal(chatId, text, 0, { reply_to_message_id: replyId });
    }

    private sendMessageInternal(chatId: number, text: string, attempt: number, options?: SendMessageOptions) {
        if (attempt < 5) {
            this.bot.sendMessage(chatId, text, options)
                .catch(err => {
                    console.log(err);
                    console.log(`Attempt: ${attempt}.`);
                    this.sendMessageInternal(chatId, text, attempt + 1, options);
                })
        }
    }
}

let tgBot: TgBot;

if (process.env.NODE_ENV === "development") {
    if (!global._tgBot) {
        global._tgBot = new TgBot(TG_TOKEN);
    }
    tgBot = global._tgBot;
} else {
    tgBot = new TgBot(TG_TOKEN);
}

export default tgBot;
