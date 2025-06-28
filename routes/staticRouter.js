const express = require("express")
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/urls",restrictTo(['ADMIN']))

router.get('/', restrictTo(["NORMAL"]), async (req, res) => {
        const allurls = await URL.find({ createdBy: req.user._id });
        return res.render("home", {
                urls: allurls,
        });
})

router.get("/login", (req, res) => {
        return res.render("login")
})

router.get("/signup", (req, res) => {
        return res.render("signup")
})

module.exports = router;