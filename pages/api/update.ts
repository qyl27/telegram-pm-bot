import {NextApiRequest, NextApiResponse} from "next";
import {ADMIN_ID, SECRET_TOKEN} from "./_config";
import tgBot from "./_tg";

export default function onUpdate(req: NextApiRequest, res: NextApiResponse) {
    let header = req.headers['X-Telegram-Bot-Api-Secret-Token'];
    if (header !== SECRET_TOKEN) {
        res.status(403);
    }

    tgBot.processUpdate(req.body);

    res.status(200).write("True");
}
