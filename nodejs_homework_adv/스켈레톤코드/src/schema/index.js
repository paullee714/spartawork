const mongoose = require('mongoose');

const connect = () => {
    return mongoose
        .connect('mongodb://localhost:27017/board', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            ignoreUndefined: true
        })
        .catch(err => console.log(err));
};

mongoose.connection.on('error', err => {
    console.error('몽고디비 연결 에러입니다.', err);
});

module.exports = connect;
