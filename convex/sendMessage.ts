import { mutation } from './_generated/server';
import { Message } from '../utils/types';

export default mutation(
    async ({ db }, from: string, to: string, message: string) => {
        const newMessage: Message = {
            from: from,
            to: to,
            message: message,
            timestamp: new Date().getTime(),
        };

        db.insert('chats', newMessage);
    }
);
