const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data });
    })
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                message: "Category doesnot exists"
            })
        }
        req.category = category;
        next();
    })
}

exports.readCategory = (req, res) => {
    return res.json(req.category);
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(category);
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, deletedCategory) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "delete category successfully"
        })
    })
}

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(categories);
    })
}