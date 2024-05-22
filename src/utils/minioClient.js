const Minio = require('minio');

exports.minioClient = new Minio.Client({
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: "uXNrVuUHChgW999eZp6M",
    secretKey: "VwShqcoVbz6QHvTdKN8YM2YupkEazoJk560Lx80q",
});
