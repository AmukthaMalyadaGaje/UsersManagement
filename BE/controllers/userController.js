const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
    try {
        console.log("Entered getUsers");
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit);
        // const users = await User.find();
        console.log("users", users);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        console.log("entered updateUser");
        const { id } = req.params;
        console.log("req.body", req.body);
        const { first_name, last_name, email } = req.body;

        const user = await User.findByIdAndUpdate(id, { $set: { firstName: first_name, lastName: last_name, email } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("user", user);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};
