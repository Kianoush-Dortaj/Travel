import { TravelResidenceModel } from './../../model/TravelResidence';

export default new class TravelResidenceRepository {

    /****
      *
      * Create TravelResidence
      *
      ****/
    CreateTravelResidence(value): Promise<any> {
        return new Promise((resolve, reject) => {
            const TravelResidence = new TravelResidenceModel({ ...value });
            return TravelResidence
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
      * Set TravelResidence
      *
      ****/
    SetTravelResidence(item): Promise<any> {
        return new Promise((resolve, reject) => {
            TravelResidenceModel.updateOne(
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
     * Delete TravelResidence
     *
     ****/
    DeleteTravelResidence(id): Promise<any> {
        return new Promise((resolve, reject) => {
            TravelResidenceModel.updateOne(
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
 * GetAll TravelResidence
 *
 ****/
    GetAllTravelResidence() {
        return TravelResidenceModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name  icon");
    }

    /****
*
* GetAll TravelResidence Paging
*
****/
    async GetAllTravelResidencePaging() {
        let data;

        let result = await TravelResidenceModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name icon");
        let count = await TravelResidenceModel.find({})
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
   * Get ById TravelResidence
   *
   ****/
    GetByIdTravelResidence(id) {
        return TravelResidenceModel.findById({ _id: id })
            .where("isDelete")
            .equals(false)
            .select("name  icon ");
    }

}