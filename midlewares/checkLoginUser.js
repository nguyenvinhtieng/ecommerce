
const jwt = require('jsonwebtoken')
const User = require('../models/User')
module.exports = async function checkLoginUser(req, res, next) {
    try {
        let token = req.headers.authorization.split(' ')[1]
        if (!token) return res.json({ success: false, message: 'Missing token' })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.json({ success: false, message: "Invalid Token" })
            let idUser = decoded.id
            let user = await User.findById(idUser).select("-password")
            if (!user) return res.json({ success: false, message: "User not found" })
            req.user = user
            next();
        });
    } catch (err) {
        return res.json({ success: false, message: err.message })
    }
}