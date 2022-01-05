const Product = require("../models/Product")
var multiparty = require('multiparty');
const uploadImage = require("../lib/uploadImage")
class ProductController {
    async getProduct(req, res) {
        try {
            let products = await Product.find({}).lean();
            return res.json({ success: true, products })
        } catch (err) {
            return res.json({ success: false, message: err.message })
        }
    }
    async addProduct(req, res) {
        try {
            var form = new multiparty.Form();
            form.parse(req, async function (err, fields, files) {
                if (err) return res.json({ success: false, message: err.message })
                let name = fields.name[0]
                let sub_title = fields.sub_title[0]
                let description = fields.description[0]
                let category = fields.category[0]
                let price = fields.price[0]
                let image_url = ""
                if (files.image) {
                    image_url = await uploadImage(files.image[0])
                }
                let data = { name, sub_title, description, category, price, image_url }
                let product = new Product(data);
                try {
                    await product.save();
                } catch (err) {
                    console.log(err)
                }
                return res.json({ success: true, product })
            })
        } catch (err) {
            return res.json({ success: false, message: err.message })
        }
    }

    async deleteProduct(req, res) {
        try {
            let { product_id } = req.body
            await Product.findOneAndDelete({ _id: product_id })
            return res.json({ success: true, message: "Product deleted" })
        } catch (err) {
            return res.json({ success: false, message: err.message })
        }
    }
}

module.exports = new ProductController();