const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var productSchema = new mongoose.Schema({
    name: { type: String },
    sub_title: { type: String },
    description: { type: String },
    image_url: { type: String, default: [] },
    category: { type: String, default: "" },
    sold: { type: Number, default: 0 },
    price: { type: Number },
    sale: { type: Number, default: 0 },
    slug: { type: String, slug: "name" }
});
mongoose.plugin(slug);
module.exports = mongoose.model('Product', productSchema);