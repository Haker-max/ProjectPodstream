export function localVariables(req, res, next) {
    res.app.locals = {
        OTP: null,
        resetSession: false,
    };
    next();
}
// middleware/authMiddleware.js
// const admin = require('../index.js'); // Import the firebase-admin instance

