const multer = require('multer');

const upload = multer({
    limits: {
        //Image Limiter à 2Mo
        fileSize: Math.pow(2,21),
    }
});

module.exports = upload