const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(500).json(err);
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform this action'
            })
        }
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        res.json(user);
    })
}