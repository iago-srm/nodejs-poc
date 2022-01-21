export * from './error-messages.enum';
import { English } from './en/error-messages';
import { Portuguese } from './pt/error-messages';

export const UserMessages = {
    en: English,
    pt: Portuguese,
};

export const Messages = {
    ...UserMessages,
};
