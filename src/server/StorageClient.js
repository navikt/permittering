const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  endpoint: process.env.S3_URL,
  regionName: process.env.S3_REGION,
});

module.exports = {
  listObjects: (userId) => {

  },
  getObject: (userId, objectId) => {

  },
  putObject: (userId, objectId) => {

  },
  deleteObject: (userId, objectId) => {

  },
};
