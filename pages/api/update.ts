import {NextApiRequest, NextApiResponse} from "next";
import {SECRET_TOKEN} from "../../bot/config";
import tgBot from "../../bot/tgBot";

export default function onUpdate(req: NextApiRequest, res: NextApiResponse) {
    let header = req.headers['x-telegram-bot-api-secret-token'];

    if (header === SECRET_TOKEN) {
        tgBot.processUpdate(req.body);

        res.status(200).json("True");
        return;
    }

    res.status(403).json({});
}
