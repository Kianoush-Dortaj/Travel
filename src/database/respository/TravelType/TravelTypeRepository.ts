import { TravelTypeModel } from './../../model/TravelType';

export default new class TravelTypeRepository {

    /****
      *
      * Create TravelType
      *
      ****/
    CreateTravelType(value): Promise<any> {
        return new Promise((resolve, reject) => {
            const TravelType = new TravelTypeModel({ ...value });
            return TravelType
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
      * Set TravelType
      *
      ****/
    SetTravelType(item): Promise<any> {
        return new Promise((resolve, reject) => {
            TravelTypeModel.updateOne(
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
     * Delete TravelType
     *
     ****/
    DeleteTravelType(id): Promise<any> {
        return new Promise((resolve, reject) => {
            TravelTypeModel.updateOne(
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
 * GetAll TravelType
 *
 ****/
    GetAllTravelType() {
        return TravelTypeModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name  icon");
    }

    /****
*
* GetAll TravelType Paging
*
****/
    async GetAllTravelTypePaging() {
        let data;

        let result = await TravelTypeModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name icon");
        let count = await TravelTypeModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name icon")
            .estimatedDocumentCount();
        data = {
            result: result,
            count: count
        };
        return data;
    }
    /****
   *
   * Get ById TravelType
   *
   ****/
    GetByIdTravelType(id) {
        return TravelTypeModel.findById({ _id: id })
            .where("isDelete")
            .equals(false)
            .select("name  icon ");
    }

}