import middlware from "./Middlware";

export default new class FileToField extends middlware {

  fileToAvatar(req, res, next) {
    if (!req.file) {
      req.body.avatar = undefined;
    } else {
      req.body.avatar = req.file.originalname;
    }
    next();
  }

}

