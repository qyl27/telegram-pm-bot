import {ADMIN_ID, TG_TOKEN} from "./config";
import {Context, Telegraf} from "telegraf";
import { Update, MessageEntity, Message } from "typegram";
import {User} from "typegram/manage";

class TgBot {
    bot: Telegraf;

    constructor(token: string) {
        this.bot = new Telegraf(token);

        this.bot.hears(/\/echo (.+)/, ctx => this.onEcho(ctx));

        this.bot.start(ctx => this.onStart(ctx));
        this.bot.on('text', ctx => this.onText(ctx))
    }

    public async processUpdate(body: any) {
        await this.bot.handleUpdate(body);
    }

    protected onEcho(context) {
        if (context.match.length > 1) {
            this.replyTo(context, context.match[1]);
        }
    }

    protected onStart(context: Context<Update.MessageUpdate>) {
        let msg = context.message;

        if (msg.chat.type === 'private' && msg.from.id === ADMIN_ID) {
            this.replyTo(context, "我在~");
        } else {
            this.replyTo(context, "欢迎联系私聊 Bot ，我已经打开了一条转发通道至我的 Owner 。\n回复我的消息就可以进行私聊了。");
        }
    }

    protected onText(context: Context<Update.MessageUpdate>) {
        if ('reply_to_message' in context.message) {
            this.onReply(context);
        }
    }

    protected onReply(context: Context<Update.MessageUpdate>) {
        let msg = context.message;

        if ('reply_to_message' in msg) {
            let reply = msg.reply_to_message;

            if (msg.chat.type === 'private' && msg.from.id !== ADMIN_ID) {
                if ('text' in msg) {
                    this.forwardMessage(msg.from, ADMIN_ID, msg.text);
                } else {
                    // Todo: qyl27: More message type.
                    this.replyTo(context, "暂时不支持其他类型的消息呢，请使用文本消息。");
                }
            }

            if (msg.chat.type === 'private' && msg.from.id === ADMIN_ID) {
                let targetId: string;

                if ('text' in reply) {
                    let arr1 = reply.text.split("【");
                    let arr2 = arr1[1].split("】");
                    targetId = arr2[0];
                }

                if (targetId) {
                    this.forwardMessageReverse(Number(targetId).valueOf(), msg.chat.id, msg.message_id);
                } else {
                    this.replyTo(context, "错误：找不到对应的用户。");
                }
            }
        }
    }

    public forwardMessage(user: User, chatId: number, text: string) {
        let username = user.first_name + (user.last_name ? ' ' + user.last_name : '');
        let userId = user.username ? ` (@${user.username}) :` : '';
        let prefixLine = `${username} ${userId}`;

        this.forwardMessageInternal(chatId, `【${user.id}】${prefixLine}\n${text}`, [], 0);
    }

    private forwardMessageInternal(chatId: number, text: string, entities: MessageEntity[], attempt: number) {
        if (attempt < 5) {
            this.bot.telegram.sendMessage(chatId, text, {
                entities: entities,
                // parse_mode: 'HTML'
            })
                .catch(err => {
                    console.log(err);
                    console.log(`Forwarding message to ${chatId}. Attempt: ${attempt}.`);
                    this.forwardMessageInternal(chatId, text, entities, attempt + 1);
                });
                // .then(res => {
                //     console.log(res)
                // })
        }
    }

    public forwardMessageReverse(chatId: number, fromChatId: number, msgId: number) {
        this.forwardMessageReverseInternal(chatId, fromChatId, msgId, 0);
    }

    private forwardMessageReverseInternal(chatId: number, fromChatId: number, msgId: number, attempt: number) {
        if (attempt < 5) {
            this.bot.telegram.forwardMessage(chatId, fromChatId, msgId)
                .catch(err => {
                    console.log(err);
                    console.log(`Forwarding message to ${chatId}. Attempt: ${attempt}.`);
                    this.forwardMessageReverseInternal(chatId, fromChatId, msgId, attempt + 1);
                });
        }
    }

    public sendMessageTo(chatId: number, text: string) {
        this.sendMessageToInternal(chatId, text, 0);
    }

    public sendMessage(context: Context, text: string) {
        this.sendMessageInternal(context, text, 0);
    }

    public replyTo(context: Context<Update.MessageUpdate>, text: string) {
        this.replyToInternal(context, text, 0);
    }

    private sendMessageToInternal(chatId: number, text: string, attempt: number) {
        if (attempt < 5) {
            this.bot.telegram.sendMessage(chatId, text)
                .catch(err => {
                    console.log(err);
                    console.log(`Sending message to ${chatId}. Attempt: ${attempt}.`);
                    this.sendMessageToInternal(chatId, text, attempt + 1);
                });
        }
    }

    private sendMessageInternal(context: Context, text: string, attempt: number) {
        if (attempt < 5) {
            context.sendMessage(text)
                .catch(err => {
                    console.log(err);
                    console.log(`Sending message to context: ${context.chat.id}. Attempt: ${attempt}.`);
                    this.sendMessageInternal(context, text, attempt + 1);
                });
        }
    }

    private replyToInternal(context: Context<Update.MessageUpdate>, text: string, attempt: number) {
        if (attempt < 5) {
            context.telegram.sendMessage(context.chat.id, text, {reply_to_message_id: context.message.message_id})
                .catch(err => {
                    console.log(err);
                    console.log(`Replying message to context: ${context.chat.id}. Attempt: ${attempt}.`);
                    this.replyToInternal(context, text, attempt + 1);
                });
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
