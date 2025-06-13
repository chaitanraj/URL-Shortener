const { handleNewUrl } = require("../controllers/url");

const express=require("express")

const router=express.Router();


router.post("/",handleNewUrl)

module.exports=router
