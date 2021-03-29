import { User } from '../../../domain';
import request from 'supertest';
import { app } from '../../../app';
import { insertUser } from '../../../application/';
import * as helpers from '../../../test/helpers';

const testUser = new User();
testUser.email = helpers.getRandomEmail();
const testUser1 = new User();
testUser1.email = helpers.getRandomEmail();
const testEntries: User[] = [testUser, testUser1];

it('gets all users from db', async () => {
  testEntries.forEach(async user => {
    insertUser(user);
  });
  await request(app)
    .get('/api/v1/users')
    .send()
    .expect(200, testEntries);
});
