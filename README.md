# threadly_portfolio

A collection of RESTful APIs to manage files in the Threadly system. Files are saved with the name stored in a database and the actual images stored in Minio.

## Description

This project offers three distinct RESTful endpoints for **saving**, **retrieving**, and **deleting** files. When a file is uploaded, its name is stored in the MongoDB database, and the image itself is uploaded to Minio, a cloud-based object storage service. This approach allows for lightweight database entries while managing large image files efficiently in cloud storage.

### Key APIs:
- **Save File API**: Uploads an image to Minio and saves the file name in MongoDB.
- **Retrieve File API**: Fetches an image from Minio using the file name stored in the database.
- **Delete File API**: Deletes both the image from Minio and the corresponding file name from MongoDB.

### Technology Stack:
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: A lightweight framework for building RESTful APIs in Node.js.
- **MongoDB**: NoSQL database for storing file metadata (file names).
- **Minio**: Cloud-native object storage for saving files (images).
- **Multer**: Middleware for handling multipart file uploads.

## API Endpoints

### **Save File API**
- **POST** `/image`
    - Description: Uploads an image to Minio and stores the file name in MongoDB.
    - Example Request:
        ```bash
        POST /image
        Content-Type: multipart/form-data

        {
          "file": "your_image.jpg"
        }
        ```
    - Example Response:
        ```json
        [
            "your_image.jpg"
        ]
        ```

### **Retrieve File API**
- **GET** `/image/:objectName`
    - Description: Retrieves the image from Minio using the file name stored in MongoDB.
    - Example Request:
        ```bash
        GET /image/your_image.jpg
        ```
    - Example Response:
        The API will return the requested image file, which can be displayed or downloaded.

### **Delete File API**
- **DELETE** `/image/:objectName`
    - Description: Deletes the image from Minio and removes the corresponding file name from MongoDB.
    - Example Request:
        ```bash
        DELETE /image/your_image.jpg
        ```
    - Example Response:
        ```json
        {
          "message": "Success"
        }
        ```




backend for threadly to upload and get files

# podman machine init
# podman machine start

## start minio with podman 
run_minio.sh

## configurate aws with access keys
aws configure

## create a bucket
create_bucket.sh

## How to run scripts
gitbash => ./<fileName>

## Not working for the moment
docker build -t threadly-portfolio-demo . 
docker run -d -p 3004:3004 threadly-portfolio-demo