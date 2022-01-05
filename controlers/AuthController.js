const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
class AuthController {

    // POST /register
    async register(req, res) {
        try {
            const { username, password, name, email } = req.body;
            const user = await User.findOne({ username })
            if (user) return res.json({ success: false, message: "Username already in use" })
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new User({ username, password: passwordHash, name, email })
            await newUser.save()
            return res.json({ success: true, message: "Account saved successfully" })
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error: " + error.message })
        }
    }

    async refereshToken(req, res) {
        try {
            const { token } = req.body
            if (!token) return res.status(400).json({ success: false, message: "Missing token" })
            let user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const accessToken = createAccessToken({ id: user.id })
            return res.status(200).json({ success: true, accessToken: accessToken })
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error: " + error.message })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user)
                return res.status(400).json({ success: false, message: "Username is not correct" })
            const matchedPassword = await bcrypt.compare(password, user.password)
            if (!matchedPassword)
                return res.status(400).json({ success: false, message: "Password is not correct" })
            const accessToken = createAccessToken({ id: user._id })
            return res.json({ success: true, token: accessToken, user });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error: " + error.message })
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie(process.env.REFERESH_TOKEN_NAME, { path: '/referesh-token' })
            res.json({ success: true, message: "Logout" })
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error: " + error.message })
        }
    }
}
function createAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

function createRefereshToken(user) {
    return jwt.sign(user, process.env.REFERESH_TOKEN_SECRET, { expiresIn: '7d' })
}
module.exports = new AuthController();