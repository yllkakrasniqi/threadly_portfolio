const Minio = require('minio');
const config = require('../config');

const endpoint = config.minio.endpoint;
const access_key = config.minio.access_key
const secret_key = config.minio.secret_key

exports.minioClient = new Minio.Client({
    endPoint: endpoint,
    // port: 9090,
    useSSL: false,
    accessKey: access_key,
    secretKey: secret_key,
});
