const User = require("../schema/User");

async function Authenticate(req, res, next) {
    const userId = req.cookies.userId;
    if (userId) {
        req.user = await User.findById(userId);
    }
    next();
}

module.exports = Authenticate
