const { minioClient } = require("./utils/minioClient");
const ProdImage = require("./models/ProdImage")

const fs = require('fs');
const path = require("path");

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
 * 
 * @param {*} file 
 * @param {*} prod_color_id 
 * @returns object with columns: _id, filename, path, prod_color_id
 * 
 * Function that get a file and save it in minio, a folder (images)
 * just in case if images lost in minio and in the end create an 
 * object to save it in mongodb
 */
const saveFile = ( file, prod_color_id ) => {
  return new Promise ((resolve, reject) => {
    // Create an unique filename to save in database
    let fileName = file.originalname.toLowerCase().split(" ").join("-");
    fileName = Date.now() + "-" + fileName;

    // Save for the moment in case minio bucket destroys
    // and all the files will be lost
    fs.writeFile(`./images/${fileName}`, file.buffer, (err) => {
        if (err) reject(err);
    })

    minioClient.putObject(bucketName, fileName, file.buffer, (err, etag) => {
      if (err) {
        // In case of any errors occure, the error with be return
        reject(err)
      } else {
        // At user will return the unique filename, etag and
        // message that tells everything went well
        
        // Resturn an object to save in database
        resolve(
          {
            _id: fileName,
            filename: fileName,
            path: etag.etag,
            prod_color_id: prod_color_id,
          }
        )
      }
    });
  })
}

/**
 * Function to upload files
 */
const uploadFiles = async (req, res) => {
  const prod_color_id = req.query.prod_color_id;
  // let productImages = [];

  // Check if bucket exist in minio
  try {
    const doesBucketExist = await minioClient.bucketExists(bucketName);
    if (doesBucketExist) {
      console.log(`Bucket ${bucketName} exist!`);
    } else {
      return res
        .status(400)
        .send({ message: `Bucket ${bucketName} does not exist!` });
    }
  } catch (err) {
    console.log(err)
    // In case of any errors occure, the error with be return
    return res.status(401).json(err);
  }

  const files = req.files;
  const productImages = files.map(file => saveFile(file, prod_color_id))
  await Promise.all(productImages)
  .then(result => {
    ProdImage.insertMany(result)
    .then((prodImages) => {
      const productFilenames = prodImages.map(ele => ele.filename)
      return res.status(200).send(productFilenames);
    })
    .catch((err) => {
      return res.status(500).json(err);
      // return res.status(500).send("Error saving image to the database");
    })
  })
} 

const removeObject = async (req, res) => {
  const objectName = req.params.objectName;

  const record = await ProdImage.findOne({ filename: objectName });
  if (!record) {
    return res
      .status(400)
      .send({ message: `File ${objectName} does not exist!` });
  }

  try {
    const filePath = path.join(__dirname, "..", "images", record.filename);
    fs.unlink(filePath);

    await ProdImage.deleteOne({ filename: objectName });

    res.status(200).send({ message: "Success" });
  } catch (err) {
    res.status(500).send("Error while deleting the file");
  }
}

module.exports = {
  getObject,
  uploadFiles,
  removeObject
};
