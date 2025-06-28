const express = require("express")
const path=require("path")
const urlRoute = require("./routes/url")
const app = express();
const { connectToMongoDB } = require("./connect")
const staticRoute=require("./routes/staticRouter")
const PORT = 3001
const URL = require('./models/url')

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() => {
    console.log("MongoDb connected")
})

app.set("view engine","ejs")
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// app.get("/test",async (req,res)=>{
//     const allUrls=await URL.find({})
//     return res.render('home',{urls:allUrls})
// })


app.use("/url", urlRoute)
app.use("/", staticRoute)


app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    }, 
    {
        $push: {
            visitHitory:
            
            {
                timestamp: Date.now()
            },
        }
    })
    res.redirect(entry.redirectURL)
})




app.listen(PORT, () => console.log(`Server started on ${PORT}`))