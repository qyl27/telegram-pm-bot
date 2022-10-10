import {
    Animation,
    Audio, Contact, Dice,
    Document, Game, InlineKeyboardMarkup, Invoice,
    MessageEntity, PassportData,
    PhotoSize, Poll,
    Sticker, SuccessfulPayment, Venue,
    Video,
    VideoNote,
    Voice, WebAppData
} from "node-telegram-bot-api";

export type Message = {
    message_id: number;
    from?: User;
    sender_chat?: Chat;
    date: number;
    chat?: Chat;

    forward_from?: User;
    forward_from_chat?: Chat;
    forward_from_message_id?: number;
    forward_signature?: string;
    forward_sender_name?: string;
    forward_date?: string;
    is_automatic_forward?: boolean;

    reply_to_message?: Message;
    via_bot?: User;

    edit_date?: number;
    has_protected_content?: boolean;
    media_group_id?: string;
    author_signature?: string;

    text?: string | undefined;
    entities?: MessageEntity[] | undefined;
    animation?: Animation | undefined;
    audio?: Audio | undefined;
    document?: Document | undefined;
    photo?: PhotoSize[] | undefined;
    sticker?: Sticker | undefined;
    video?: Video | undefined;
    video_note?: VideoNote | undefined;
    voice?: Voice | undefined;
    caption?: string | undefined;
    caption_entities?: MessageEntity[] | undefined;
    contact?: Contact | undefined;
    dice?: Dice | undefined;
    game?: Game | undefined;
    poll?: Poll | undefined;
    venue?: Venue | undefined;
    location?: Location | undefined;
    new_chat_members?: User[] | undefined;
    left_chat_member?: User | undefined;
    new_chat_title?: string | undefined;
    new_chat_photo?: PhotoSize | undefined;
    delete_chat_photo?: boolean | undefined;
    group_chat_created?: boolean | undefined;
    supergroup_chat_created?: boolean | undefined;
    channel_chat_created?: boolean | undefined;
    // message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged | undefined;
    migrate_to_chat_id?: number | undefined;
    migrate_from_chat_id?: number | undefined;
    pinned_message?: Message | undefined;
    // invoice?: Invoice | undefined;
    // successful_payment?: SuccessfulPayment | undefined;
    connected_website?: string | undefined;
    passport_data?: PassportData | undefined;
    // proximity_alert_triggered?: ProximityAlertTriggered | undefined;
    // video_chat_scheduled?: VideoChatScheduled | undefined;
    // video_chat_started?: VideoChatStarted | undefined;
    // video_chat_ended?: VideoChatEnded | undefined;
    // video_chat_participants_invited?: VideoChatParticipantsInvited | undefined;
    // web_app_data?: WebAppData | undefined;
    // reply_markup?: InlineKeyboardMarkup | undefined;
}

export type Chat = {
    id: number;
    type: string;
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}

export type User = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
}

// export type MessageAutoDeleteTimerChanged = {
//     message_auto_delete_time: number;
// }
