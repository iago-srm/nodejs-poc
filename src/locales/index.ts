export * from './messages.enum';
import { English } from './en/user.translation';
import { Portuguese } from './pt/user.translation';

export const UserMessages = {
  'en': English,
  'pt': Portuguese
}

export const Messages = {
  ...UserMessages
}