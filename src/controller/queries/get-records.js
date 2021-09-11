const { client } = require('../../mongodb');

exports.getRecords = async ({ startDate, endDate, minCount, maxCount }) => {
  const pipeline = [
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lt: endDate
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

  return await records.aggregate(pipeline).toArray();
};
