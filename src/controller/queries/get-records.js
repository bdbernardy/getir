const { client } = require('../../mongodb');

// For ISO Dates
// https://stackoverflow.com/questions/15257911/create-an-iso-date-object-in-javascript
exports.getRecords = async ({ startDate, endDate, minCount, maxCount }) => {
  const pipeline = [
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate.toISOString()),
          $lt: new Date(endDate.toISOString())
        }
      }
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: { $sum: '$counts' }
      }
    },
    {
      $match: {
        totalCount: {
          $gte: minCount,
          $lt: maxCount
        }
      }
    }
  ];

  const db = client.db(process.env.DB_NAME);
  const records = db.collection(process.env.COLLECTION_NAME);

  const request = records.aggregate(pipeline);
  return await records.aggregate(pipeline).toArray();
};
