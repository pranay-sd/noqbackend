const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const aws = require('aws-sdk');

//configure the aws environment
aws.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
});

//initialize s3
const s3 = new aws.S3();

const constantParams = {
    Bucket:process.env.AWS_BUCKET_NAME
}

// Upload fileto s3
exports.uploadToS3 = (file,next) =>{
    const fileStream = fs.createReadStream(file.tempFilePath);
    console.log(file.tempFilePath)
    const params = {
        // ...constantParams,
        Bucket:process.env.AWS_BUCKET_NAME,
        Body:fileStream,
        Key:file.name
    };
    s3.upload(params,(error,data)=>{
        console.log(error,data);
        next(error,data);
    });
};
