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

## Installation

Follow these steps to install and run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yllkakrasniqi/threadly_portfolio.git
    ```

2. Navigate to the project directory:
    ```bash
    cd threadly-portfolio
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables by creating a `.env` file in the root of the project:
    ```bash
    PORT=3000
    CORS_ORIGIN=http://localhost:3000 or your deployed server
    DB_HOST='mongodb_host'
    DB_PORT=mongodb_port
    DB_NAME='database_name'
    MINIO_ENDPOINT=your_minio_endpoint
    MINIO_ACCESS_KEY=your_minio_access_key
    MINIO_SECRET_KEY=your_minio_secret_key
    MINIO_BUCKET=your_minio_bucket_name
    ```

5. Start the server:
    ```bash
    npm start
    ```

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

## Minio Scripts

This project includes three scripts for managing Minio (How to run scripts: ./<filename>):
initialize and start Podman: podman machine init -> podman machine start

1. **Create a Minio Bucket**: 
    - Script to create a new bucket in Minio for storing your images.
    - Example command:
        ```bash
        ./create_bucket.sh
        ```

2. **Run Minio**: 
    - Script to start Minio through podman.
    - Example command: 
        ```bash
        ./run_minio.sh
        ```

3. **Upload Files to Minio**: 
    - Script to upload files directly to Minio outside of the API (useful for batch uploads).
    - Example command:
        ```bash
        ./upload_files.sh
        ```

These scripts allow you to easily manage your Minio setup, create buckets, and upload files independently of the API.
Some notes: configurate aws with access keys (aws configure)

## Usage

You can access the APIs at `http://localhost:3000` or on your deployed server. To interact with the API, you can use tools like Postman or cURL. When uploading files, ensure that they are sent as `multipart/form-data`.


## Not working for the moment
docker build -t threadly-portfolio-demo . 
docker run -d -p 3004:3004 threadly-portfolio-demo