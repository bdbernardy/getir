require('dotenv').config();
const request = require('supertest');

const { createServer } = require('../src/create-server');
const { client } = require('../src/mongodb');

describe('POST /', () => {
  const app = createServer();

  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  it('should return records when valid payload is supplied', done => {
    const body = {
      startDate: '2016-01-01',
      endDate: '2016-01-31',
      minCount: 2700,
      maxCount: 3000
    };

    request(app)
      .post('/')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const { code, msg, records } = res.body;

        expect(code).toBe(0);
        expect(msg).toBe('Success');
        expect(records).toBeInstanceOf(Array);

        records.forEach(record => {
          expect(record.key).toBeDefined();
          expect(record.createdAt).toBeDefined();
          expect(record.totalCount).toBeDefined();
        });

        return done();
      });
  });
});
