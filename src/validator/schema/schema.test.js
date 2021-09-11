const { bodySchema } = require('./index');
const { ValidationError } = require('joi');

describe('bodySchema', () => {
  it('should throw ValidationError when startDate does not have correct format', async () => {
    const body = {
      startDate: 'XXXX-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000
    };

    await expect(() => bodySchema.validateAsync(body)).rejects.toThrow(ValidationError);
  });

  it('should throw ValidationError when endDate does not have correct format', async () => {
    const body = {
      startDate: '2016-01-26',
      endDate: '2018-02-02-1111',
      minCount: 2700,
      maxCount: 3000
    };

    await expect(() => bodySchema.validateAsync(body)).rejects.toThrow(ValidationError);
  });

  it('should throw ValidationError when minCount is not an integer', async () => {
    const body = {
      startDate: 'XXXX-01-26',
      endDate: '2018-02-02',
      minCount: 27.5,
      maxCount: 3000
    };

    await expect(() => bodySchema.validateAsync(body)).rejects.toThrow(ValidationError);
  });

  it('should throw ValidationError when maxCount is not an integer', async () => {
    const body = {
      startDate: 'XXXX-01-26',
      endDate: '2018-02-02',
      minCount: 27,
      maxCount: 30.5
    };

    await expect(() => bodySchema.validateAsync(body)).rejects.toThrow(ValidationError);
  });
});
