const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "tmp"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "tmp"));
    },
    filename: (req, file, cb) => {
      //gerar 16 bits de chars aleatorios
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        // 123ho1iu23u33-test.jpg
        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  })
};
