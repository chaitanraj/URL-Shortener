const express = require("express")
const urlRoute = require("./routes/url")
const app = express();
const { connectToMongoDB } = require("./connect")
const PORT = 3001
const URL = require('./models/url')

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() => {
    console.log("MongoDb connected")
})


app.use(express.json())

app.use("/url", urlRoute)

app.get('/:shortId', async (req, res) => {
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