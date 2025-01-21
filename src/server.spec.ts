import request from 'supertest';
import app from './server';

describe('Express Server', () => {
  it('should return Hello, Express! on GET /', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, Express!');
  })
})