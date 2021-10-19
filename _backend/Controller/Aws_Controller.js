const AWS = require("aws-sdk");

/* const s3 = new AWS.S3({
  accessKeyId: process.env.aws.accessKey,
  secretAccessKey: process.env.aws.secretKey,
}); */

const UploadFile = (req, res, fileName) => {
  const { multipartFile } = req.body;
  console.log("multipartFile", multipartFile);
  // Read content from the file
  //   const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
/*   const params = {
    Bucket: process.env.aws.bucketName,
    Key: "cat.jpg", // File name you want to save as in S3
    Body: file,
  }; */

  // Uploading files to the bucket
  /* s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  }); */
};

module.exports = {
  UploadFile: UploadFile,
};

//https://www.zeolearn.com/magazine/uploading-files-to-aws-s3-using-nodejs