import request from 'supertest';
import app from '../../../app';

let token = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: `abraham@gmail.com`, password: '123456' });
  token = res.body.data.token;
});

describe('User Profile tests', () => {
  test('Get User Profile', async () => {
    const res = await request(app)
      .get('/api/v1/user/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'User Profile Retrieve Successfully!',
      success: true,
      data: {
        id: expect.anything(),
        name: expect.anything(),
        email: expect.anything(),
      },
    });
  });
  test('Get Study Plans', async () => {
    const res = await request(app)
      .get('/api/v1/user/study-plan?startDate=2024-03-10&endDate=2024-03-10')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'User Study Plan Generate Successfully!',
      success: true,
      data: expect.anything(),
    });
  });
});
