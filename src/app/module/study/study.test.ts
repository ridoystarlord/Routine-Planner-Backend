import request from 'supertest';
import app from '../../../app';

let token = '';
let newCreatedTopicId = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: `abraham@gmail.com`, password: '123456' });
  token = res.body.data.token;
});

describe('Study Topic tests', () => {
  test('Get User Study Topics', async () => {
    const res = await request(app)
      .get('/api/v1/study/topic')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'All Topic Retrieved Successfully!',
      success: true,
      data: expect.anything(),
    });
  });
  test('Add Study Topic', async () => {
    const res = await request(app)
      .post('/api/v1/study/topic')
      .set('Authorization', `Bearer ${token}`)
      .send({ topic: `JS`, priority: 3, duration: 30 });
    newCreatedTopicId = res.body.data.id;
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'Topic Added Successfully!',
      success: true,
      data: expect.anything(),
    });
  });
  test('Update Study Topic', async () => {
    const res = await request(app)
      .put(`/api/v1/study/topic/${newCreatedTopicId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ duration: 60 });
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'Topic Update By Id Successfully!',
      success: true,
      data: expect.anything(),
    });
  });
  test('Delete Study Topic', async () => {
    const res = await request(app)
      .delete(`/api/v1/study/topic/${newCreatedTopicId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'Topic Deleted By Id Successfully!',
      success: true,
    });
  });
});
