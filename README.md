# Telegram PM Bot
这是一个 TG 私聊 Bot 的 Node.js 实现，可以在 Vercel 上运行。

## 如何使用
1. Fork 本仓库
2. 在 Vercel 中导入项目
3. 在 Vercel 项目的环境变量中增加如下内容：

| 环境变量名        | 内容                   | 备注                                            |
|--------------|----------------------|-----------------------------------------------|
| TG_TOKEN     | Telegram Bot 的 Token |                                               |
| SECRET_TOKEN | PM Bot 使用的 Token     | 在 TG 调用我们的 WebHook 的过程中传递，以保证消息是由 TG 的服务器发出的。 |
| ADMIN_ID     | Bot 管理员的 Uid         |                                               |

4. 在本地使用 `curl` 命令，向 Bot 添加钩子（替换尖括号里面的内容）。该 PM Bot 的 WebHook 地址通常是 `https://<项目使用的域名>/api/update`。

```shell
curl --request POST --url https://api.telegram.org/bot<Telegram 的 Token>/setWebhook --header 'content-type: application/json' --data '{"url": "<WebHook 地址>", "secret_token": "<PM Bot 的 SecretToken>"}'
```

## 驾照
Apache 2.0
