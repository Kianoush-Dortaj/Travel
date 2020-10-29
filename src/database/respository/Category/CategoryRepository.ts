import { CategoryModel } from './../../model/Category';

export default new class CategoryRepository {

    /****
      *
      * Create Category
      *
      ****/
    CreateCategory(value): Promise<any> {
        return new Promise((resolve, reject) => {
            const Category = new CategoryModel({ ...value });
            return Category
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
      * Set Category
      *
      ****/
    SetCategory(item): Promise<any> {
        return new Promise((resolve, reject) => {
            CategoryModel.updateOne(
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
     * Delete Category
     *
     ****/
    DeleteCategory(id): Promise<any> {
        return new Promise((resolve, reject) => {
            CategoryModel.updateOne(
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
 * GetAll Category
 *
 ****/
    GetAllCategory() {
        return CategoryModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name  parentId");
    }

    /****
*
* GetAll Category Paging
*
****/
    async GetAllCategoryPaging() {
        let data;

        let result = await CategoryModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name");
        let count = await CategoryModel.find({})
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
   * Get ById Category
   *
   ****/
    GetByIdCategory(id) {
        return CategoryModel.findById({ _id: id })
            .where("isDelete")
            .equals(false)
            .select("name  parentId ");
    }

}