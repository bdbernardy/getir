# Usage
POST / with the following payload signature:
```json
{
  "startDate": "2015-05-23",
  "endDate": "2016-05-23",
  "minCount": 1000,
  "maxCount": 1500
}
```

# Configuration
The application expects the following environment variables:
* COLLECTION_NAME=records
* DB_NAME=getir-case-study
* MONGO_URI=[uri to your mongodb database]