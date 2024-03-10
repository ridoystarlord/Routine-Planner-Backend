import request from 'supertest';
import app from '../../../app';

let token = '';
// let newId = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: `abraham@gmail.com`, password: '123456' });
  token = res.body.data.token;
});

describe('Schedules tests', () => {
  test('Get User Schedules', async () => {
    const res = await request(app)
      .get('/api/v1/schedule')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'User Schedule Retrieved Successfully!',
      success: true,
      data: expect.anything(),
    });
  });
  test('Add Schedule', async () => {
    const res = await request(app)
      .post('/api/v1/schedule')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: `2024-04-10`,
        classes: [
          {
            startTime: '09:00',
            endTime: '10:30',
          },
        ],
        jobs: [
          {
            startTime: '11:00',
            endTime: '04:00',
          },
        ],
        studySlots: [
          {
            startTime: '20:00',
            endTime: '23:00',
          },
        ],
      });
    // newId = res.body.data;
    expect(res.body).toEqual({
      statusCode: 200,
      message: 'User Schedule Added Successfully!',
      success: true,
    });
  });
  // test('Update Schedule', async () => {
  //   const res = await request(app)
  //     .put(`/api/v1/schedule/${newId}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       studySlots: [
  //         {
  //           startTime: '07:00',
  //           endTime: '08:00',
  //         },
  //       ],
  //     });
  //   expect(res.body).toEqual({
  //     statusCode: 200,
  //     message: 'Schedule Updated By Id Successfully!',
  //     success: true,
  //   });
  // });
  // test('Delete Schedule', async () => {
  //   const res = await request(app)
  //     .delete(`/api/v1/schedule/${newId}`)
  //     .set('Authorization', `Bearer ${token}`);
  //   expect(res.body).toEqual({
  //     statusCode: 200,
  //     message: 'Schedule Deleted By Id Successfully!',
  //     success: true,
  //   });
  // });
});
