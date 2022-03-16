const router = require('express').Router();
const s3 = require("../utils/s3");

router.post("/upload",(req,res)=>{
    const file = req.files.file;
    s3.uploadToS3(file,(error,data)=>{
        if(error){
            return res.send({error:"Something went wrong."});
        }
        return res.send({message:"File uploaded successfully"});
    });
});

module.exports = router;