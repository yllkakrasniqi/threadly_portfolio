const Minio = require('minio');

exports.minioClient = new Minio.Client({
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: "rTEo84NtDCTjS0mRot9e",
    secretKey: "G7hlqpG1zTb6iBlc5EJvaGXox4btueMTbTGOkzGF",
});
