import { SubscribeModel } from './../../model/Subscribe';

export default new class SubscribeRepository {

    /****
      *
      * Create Subscribe
      *
      ****/
    CreateSubscribe(value): Promise<any> {
        return new Promise((resolve, reject) => {
            const Subscribe = new SubscribeModel({ ...value });
            return Subscribe
                .save()
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /****
      *
      * Set Subscribe
      *
      ****/
    SetSubscribe(item): Promise<any> {
        return new Promise((resolve, reject) => {
            SubscribeModel.updateOne(
                { _id: item.id },
                { $set: { ...item } },
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    /****
     *
     * Delete Subscribe
     *
     ****/
    DeleteSubscribe(id): Promise<any> {
        return new Promise((resolve, reject) => {
            SubscribeModel.updateOne(
                { _id: id },
                { $set: { isDelete: true } },
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }
    /****
 *
 * GetAll Subscribe
 *
 ****/
    GetAllSubscribe() {
        return SubscribeModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name  parentId");
    }

    /****
*
* GetAll Subscribe Paging
*
****/
    async GetAllSubscribePaging() {
        let data;

        let result = await SubscribeModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name price");
        let count = await SubscribeModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name")
            .estimatedDocumentCount();
        data = {
            result: result,
            count: count
        };
        return data;
    }
    /****
   *
   * Get ById Subscribe
   *
   ****/
    GetByIdSubscribe(id) {
        return SubscribeModel.findById({ _id: id })
            .where("isDelete")
            .equals(false)
            .select("name  price ");
    }

}