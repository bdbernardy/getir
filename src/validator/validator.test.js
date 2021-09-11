const validator = require('./index');

describe('validator', () => {
  it('should strip unknown properties from payload', async () => {
    const body = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
      extrafield: 'Evil attempt to add a field to a mongodb document'
    };

    const req = { body };

    await validator(req, {}, () => {});

    const santizedBody = req.body;
    expect(santizedBody.extrafield).not.toBeDefined();
  });
});
