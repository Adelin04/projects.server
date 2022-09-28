const AWS = require("aws-sdk");
const fs = require("fs");
const Project = require("../Models/Project_Model");
const User = require("../Models/Users_Model");

const s3 = new AWS.S3({
  region: process.env.aws_region,
  accessKeyId: process.env.aws_accessKey,
  secretAccessKey: process.env.aws_secretKey,
});

const UploadFile = async (req, res) => {
  //  destructuring req object
  const { originalname, mimetype, path, size } = req.file;
  const { userLoggedID, userLogged_EMAIL } = req.body;

  //  construct the URL path for the profile user image using the email address of the logged in user
  // const urlPhoto = `https://projects-app-photos.s3.us-east-1.amazonaws.com/${userLogged_EMAIL
  const urlPhoto = `https://projects-app-photos.s3.amazonaws.com/${userLogged_EMAIL
    .toString()
    .split("@")[0]
    .trim()}.${originalname.toString().split(".")[1].trim()}`;

  const fileStream = fs.createReadStream(path);

  await User.update(
    {
      urlPhoto: urlPhoto,
    },
    { where: { id: userLoggedID } }
  );
  await Project.update(
    {
      projectOwnerPhoto: urlPhoto,
    },
    { where: { projectOwnerPhoto_foreignKeyUserId: userLoggedID } }
  );

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.aws_bucketName,
    Key: `${userLogged_EMAIL.toString().split("@")[0].trim()}.${originalname
      .toString()
      .split(".")[1]
      .trim()}`,
    Body: fileStream /* Buffer.from(JSON.stringify(req.file), "utf-8"), */,
  };

  // Uploading files to the bucket
  try {
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }

      console.log(`File uploaded successfully. ${data.Location}`);

      return res.send({
        succes: true,
        urlPhoto: urlPhoto,
        msg: `File uploaded successfully. ${data.Location}`,
      });
    });
  } catch (error) {
    console.log(error.toString());
    return res.send({
      succes: false,
      msg: `${error.toString()}`,
    });
  }
};

module.exports = {
  UploadFile: UploadFile
};

