import crypto from 'crypto';

export const getRandomString = (length: number) => {
  return crypto.randomBytes(Math.floor(length/2)).toString('hex');
}

export const getRandomEmail = () => {
  return `${crypto.randomBytes(Math.floor(10)).toString('hex')}@${crypto.randomBytes(Math.floor(10)).toString('hex')}.com`;
}