const { minioClient } = require("./utils/minioClient");
const fs = require('fs')

const bucketName = "threadly-dev";

/**
 * Function to get an object from minio bucket
 * user should give the parameter :objectName.
 */
const getObject = async (req, res) => {
  const objectName = req.params.objectName;
  // Check if the bucket in minio exist
  try {
    const doesBucketExist = await minioClient.bucketExists(bucketName);
    if (doesBucketExist) {
      console.log(`Bucket ${bucketName} exist!`);
    } else {
      //if the bucket does not exist user will be inform
      return res
        .status(400)
        .send({ message: `Bucket ${bucketName} does not exist!` });
    }
  } catch (err) {
    // In case of any errors occure, the error with be return to the user
    return res.status(400).json(err);
  }

  minioClient.getObject(bucketName, objectName, (err, dataStream) => {
    if (err) {
      // In case of any errors occure, the error with be return
      res.status(500).json(err);
    } else {
      // Pipe the object data stream to the response
      dataStream.pipe(res);
    }
  });
};

/**
 * Function to upload files
 */

const Minio = require('minio');
const uploadFiles = async (req, res) => {

  const minioClient = new Minio.Client({
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: "rTEo84NtDCTjS0mRot9e",
    secretKey: "G7hlqpG1zTb6iBlc5EJvaGXox4btueMTbTGOkzGF",
})

minioClient.bucketExists(bucketName)
.then(res => res.status(200).send(res))
.catch(err => res.status(200).send(err))

  
    // Check if bucket exist in minio
  // try {
  //   const doesBucketExist = await minioClient.bucketExists(bucketName);
  //   if (doesBucketExist) {
  //     console.log(`Bucket ${bucketName} exist!`);
  //   } else {
  //     return res
  //       .status(400)
  //       .send({ message: `Bucket ${bucketName} does not exist!` });
  //   }
  // } catch (err) {
  //   console.log(err)
  //   // In case of any errors occure, the error with be return
  //   return res.status(401).json(err);
  // }

  // const files = req.files;
  // files.forEach((file) => {
  //   // Create an unique filename to save in database
  //   let fileName = file.originalname.toLowerCase().split(" ").join("-");
  //   fileName = Date.now() + "-" + fileName;

  //   // Save for the moment in case minio bucket destroys
  //   // and all the files will be lost
  //   fs.writeFile(`./images/${fileName}`, file.buffer, (err) => {
  //       if (err) throw err;
  //   })

  //   minioClient.putObject(bucketName, fileName, file.buffer, (err, etag) => {
  //     if (err) {
  //       // In case of any errors occure, the error with be return
  //       res.status(500).json(err);
  //     } else {
  //       // At user will return the unique filename, etag and
  //       // message that tells everything went well
  //       res
  //         .status(200)
  //         .json({
  //           message: "File uploaded successfully",
  //           filename: fileName,
  //           etag: etag,
  //         });
  //     }
  //   });
  // });
} 

module.exports = {
  getObject,
  uploadFiles
};
