const Auth = require('./auth.js')
const User = require('./user.js')
const Product = require('./product.js')
function route(app) {
    app.use('/api', Auth)
    app.use('/api', User)
    app.use('/api/product', Product)
}

module.exports = route