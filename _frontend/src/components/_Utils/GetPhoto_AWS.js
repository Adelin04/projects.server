/* import * as AWS from "aws-sdk";

export const accessKey = "AKIATVV6TCG4XJCQOSZE";
export const secretKey = "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";
const region = "eu-central-1";
export const bucketName = "server-aws";

AWS.config.update({
  region: region,
  accessKey,
  secretKey
});

const s3 = new AWS.S3();

export const GetPhoto_AWS = async () => {
  try {
    const URL_PHOTO = await s3.getSignedUrlPromise("getObject", {
      Bucket: bucketName,
      Key: "Abstractizarea.png",
      Expires: 60
    });
    console.log(URL_PHOTO);
  } catch (error) {
    console.log(error);
  }
};
 */