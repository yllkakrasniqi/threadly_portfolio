const dotenv = require('dotenv');

dotenv.config();

const config = {
    app: {
        port: process.env.PORT || 3000,
        cors_origin: process.env.CORS_ORIGIN || "http://localhost:3000"
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'db'
    },
    minio: {
        endpoint: process.env.MINIO_ENDPOINT || '127.0.0.1', 
        access_key: process.env.MINIO_ACCESS_KEY,
        secret_key: process.env.MINIO_SECRET_KEY,
        bucket: process.env.MINIO_BUCKET || 'test_bucket'
    }
}

module.exports = config