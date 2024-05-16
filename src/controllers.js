const { minioClient } = require("./utils/minioClient");

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

module.exports = {
  getObject,
};
