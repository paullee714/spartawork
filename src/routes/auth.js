const express = require('express');
const User = require('../schema/User');
const router = express.Router();


// 회원가입
router.post('/sign-up', async (req, res) => {
    const { username, password, passwordConfirmation } = req.body;

    const exists = await User.findOne({ username });
    if (exists) {
        res.statusCode = 400;
        res.send(`중복된 닉네임입니다.`);
        return;
    }

    if (!/[a-zA-Z0-9]+/.test(username) || username.length < 3) {
        res.statusCode = 400;
        res.send(`닉네임은 3자이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9) 를 포함해야합니다.`);
        return;
    }

    if (password.includes(username) || password.length < 4) {
        res.statusCode = 400;
        res.send(`비밀번호는 4자이상이며 닉네임을 포함하면 안됩니다.`);
        return;
    }

    if (password !== passwordConfirmation) {
        res.statusCode = 400;
        res.send(`비밀번호가 일치하지 않습니다.`);
        return;
    }
    const user = new User({
        username,
        password,
    });
    await user.save();
    res.statusCode = 200;
    res.send();
});

// 로그인
router.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
        res.statusCode = 400;
        res.send(`닉네임 또는 패스워드를 확인해주세요`);
        return;
    }
    res.cookie('userId', String(user._id));

    res.statusCode = 200;
    res.send();
});

router.post('/logout', async (req, res) => {
    res.clearCookie('userId');
    res.statusCode = 200;
    res.send();
});

module.exports = router;
