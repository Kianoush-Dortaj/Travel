import { DiscountModel } from './../../model/Discount';

export default new class DiscountRepository {

    /*****
     *
     * Create Discount
     *
     */
    Craete(item) {
        return new Promise((resolve, reject) => {
            DiscountModel.create({ ...item })
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    /***
     *
     * Update Discount
     *
     *  ***/
    UpdateDiscount(role) {
        return new Promise((resolve, reject) => {
            DiscountModel.updateOne(
                { _id: role.id },
                { $set: { ...role } },
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                }
            );
        });
    }
    /***
     *
     * Delete Discount
     *
     ***/
    DeleteDiscount(id) {
        console.log(id);
        return new Promise((resolve, reject) => {
            DiscountModel.updateOne(
                { _id: id },
                { $set: { isDelete: true } },
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }
    /***
     *
     * Get All Discount Paging
     *
     ***/
    async GetAllDiscountPaging() {
        let data;
        let model = [];

        let discount = await DiscountModel.find({})
            .where("isDelete")
            .equals(false)
            .exec();
        let count = await DiscountModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name")
            .estimatedDocumentCount();

       discount.forEach((elemnt) => {
            model.push({
                id: elemnt._id,
                name: elemnt.name,
                percent: elemnt.percent,
                startDate: elemnt.startDate,
                expireDate: elemnt.expireDate,
                expire: elemnt.expireDate > Date.now() ? false : true,
                updateDate: elemnt.updateDate,
                numberOfUse: elemnt.numberOfUse,
                updateBy: elemnt.updateBy,
                deleteDate: elemnt.deleteDate,
                deleteby: elemnt.deleteby,
                createDate: elemnt.createDate,
                createBy: elemnt.createBy,
            });
        });
        return data = {
            result: model,
            count: count
        };
    }
    /***
     *
     * Get All Discount
     *
     ***/
    GetAllDiscount() {
        return DiscountModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name")
            .exec();
    }
    /***
     *
     * Get Discount ById
     *
     ***/
    GetDiscountById(id) {
        return DiscountModel.findById({ _id: id })
            .where("isDelete")
            .equals(false)
            .exec();
    }

}