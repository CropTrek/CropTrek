import multer from 'multer'
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.png')
  }
})
var upload = multer({ storage: storage });
export default upload;