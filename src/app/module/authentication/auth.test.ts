import request from 'supertest';
import app from '../../../app';

describe('Authentication tests', () => {
  test('Register', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Nair', email: 'nair@gmail.com', password: '123456' });
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'User Register Successfully!',
      success: true,
    });
  });
  test('Login', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nair@gmail.com', password: '123456' });
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'User Login Successfully!',
      success: true,
      data: { token: expect.anything() },
    });
  });
});
