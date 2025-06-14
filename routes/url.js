const { handleNewUrl,handleGetanalytics } = require("../controllers/url");

const express=require("express")

const router=express.Router();


router.post("/",handleNewUrl)

router.get('/analytics/:shortId',handleGetanalytics)


module.exports=router
