import request from 'supertest';
import { app } from '../../app';
import { 
  insertUser,
} from '../../application';
import { getMockUsersArray } from '../mock-data';
import { AsyncRedis } from '../../infrastructure/async-redis';
import { baseUrn, testRedis } from '../setup';

describe('Redis cache.', () => {
  it('user is saved after get/:email route is called.', async () => {
    const user = getMockUsersArray(1)[0];
    await insertUser(user);
    await request(app).get(`${baseUrn}/${user.email}`);
    const cachedUser = await testRedis.asyncGet(AsyncRedis._getEntryName('users', { email: user.email }));
    expect(JSON.stringify({...JSON.parse(cachedUser)})).toBe(user);
  });
});