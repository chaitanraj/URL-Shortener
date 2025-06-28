const express = require("express")
const path=require("path")
const app = express();
const { connectToMongoDB } = require("./connect")
const PORT = 3001
const URL = require('./models/url')
const cookieParser=require('cookie-parser')

const urlRoute = require("./routes/url")
const staticRoute=require("./routes/staticRouter")
const userRoute=require("./routes/user")
const {restrictToLoggedinUserOnly,restrictTo,checkForAuthentication}=require("./middleware/auth")

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() => {
    console.log("MongoDb connected")
})

app.set("view engine","ejs")
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url",restrictTo(["NORMAL"]), urlRoute)
app.use("/user", userRoute)
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