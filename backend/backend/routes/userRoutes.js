    const express = require('express');
    const router = express.Router();
    const {
    signupUser,
    loginUser,
    googleOAuthUser
    } = require('../controller/userController');

    // Auth routes
    router.post('/signup', signupUser);
    router.post('/login', loginUser);
    router.post('/google-auth', googleOAuthUser);

    module.exports = router;
