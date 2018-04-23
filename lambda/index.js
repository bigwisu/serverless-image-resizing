'use strict';

const AWS = require('aws-sdk');
const parseUrl = require('./lib/parseUrl');

const S3 = new AWS.S3({
  signatureVersion: 'v4',
});
const Sharp = require('sharp');

const BUCKET = process.env.BUCKET;
const URL = process.env.URL;

exports.handler = function(event, context, callback) {

  const key = event.queryStringParameters.key;
  const resizer = parseUrl(key);
  const originalKey = resizer.originalKey;
  const width = resizer.resize.width;
  const height = resizer.resize.height;
  const mimeType = resizer.mimeType;

  S3.getObject({Bucket: BUCKET, Key: originalKey}).promise()
    .then(data => Sharp(data.Body)
      .resize(width, height)
      .toBuffer()
    )
    .then(buffer => S3.putObject({
        Body: buffer,
        Bucket: BUCKET,
        ContentType: mimeType,
        Key: key,
      }).promise()
    )
    .then(() => callback(null, {
        statusCode: '301',
        headers: {'location': `${URL}/${key}`},
        body: '',
      })
    )
    .catch(err => callback(err))
};
