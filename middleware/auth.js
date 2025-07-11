const { getUser } = require("../service/auth")

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie)

        return next();

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

// async function restrictToLoggedinUserOnly(req,res,next){
//     const userUid=req.headers["Authorization"];

//     if(!userUid)
//         return res.redirect("/login");

//     const token= userUid.split('Bearer ')

//     const user=getUser(userUid)

//     if(!user)
//         return res.redirect("/login")

//     req.user=user;
//     next();
// }

function restrictTo(roles=[]) {
    return function (req, res, next) {
        if (!req.user)
            return res.redirect("/login");

        if (!roles.includes(req.user.role))
            return res.end("UnAuthorised");

        return next();

    }
}

module.exports = {
    checkForAuthentication,restrictTo
}