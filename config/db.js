const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const CONNECTION_STRING = "mongodb+srv://vinhtieng:vinhtieng@cluster0.ugswm.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
