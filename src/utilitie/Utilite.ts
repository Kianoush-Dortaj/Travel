
import bycrypt from "bcrypt";

export default new class Utilities {

    HashField(field) {
        return new Promise((resolve, reject) => {
            bycrypt.hash(field, bycrypt.genSaltSync(15), (error, hash) => {
                if (error) return reject(error);
                resolve(hash);
            });
        });
    }


    getDirectoryImage(dir) {
        return dir.substring(10);
    }

}