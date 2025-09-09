const multer = require('multer')

// @ crypto use for make random file bytes to name .. .....
const crypto = require('crypto');
//@ path is a package for get file extension 
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, "images/uploads");
// create folder if not exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
// @ Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(10, function (err, name) {
            // @ name is Buffer so need convert in string of hex
            const conString = name.toString('hex')
            //@random file name for make each unique name 
            let fn = conString + path.extname(file.originalname)
            cb(null, fn)
        })
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    }
})

// @ make file upload variable 
const upload = multer({ storage: storage })
module.exports = upload



