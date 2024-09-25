const Minio = require('minio');

exports.minioClient = new Minio.Client({
    endPoint: "192.168.100.241", //"127.0.0.1",
    // port: 9090,
    useSSL: false,
    accessKey: "hv7yoq914WXyWByR",
    secretKey: "Zt8ANJebA78wru0mqCyECdnfkpj5e3mD",
});
