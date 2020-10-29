import multer from "multer";
import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";

const GetDirectory = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let day = new Date().getDay();
  return `src/public/uploads/avatar/${year}/${month}/${day}`;
};

const AvataStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = GetDirectory();
    mkdirp(dir).then((made) => {
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    let fileName = GetDirectory() + "/" + file.originalname;
    cb(null, file.originalname);
  },
});

const UploadAvatar = multer({
  storage: AvataStorage,
});

export default UploadAvatar;
