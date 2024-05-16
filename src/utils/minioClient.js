const Minio = require('minio');

exports.minioClient = new Minio.Client({
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: "EluUIOeBXAGHxHPoTYV0",
    secretKey: "O19qrANdYGNG0h5d0MAZFrYoOWUfxuzLjLtiXZCu",
});
