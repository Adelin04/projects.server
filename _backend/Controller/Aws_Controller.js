const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKey,
  secretAccessKey: process.env.secretKey,
});

const UploadFile = async (req, res) => {
  const { originalname, mimetype, size } = req.file;
  console.log("file", req.file);
  console.log("originalname", originalname);
  console.log("mimetype", mimetype);
  res.send({ succes: true });
  // Read content from the file
  //   const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.bucketName,
    Key: originalname, // File name you want to save as in S3
    Body: Buffer.from(JSON.stringify(req.file), "utf-8"),
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = {
  UploadFile: UploadFile,
};

//https://www.zeolearn.com/magazine/uploading-files-to-aws-s3-using-nodejs
