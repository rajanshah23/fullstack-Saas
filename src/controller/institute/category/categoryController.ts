import { Response } from "express";
import { IExtendedRequest } from "../../../types/types";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

class categoryController {
    static async createCategory(req: IExtendedRequest, res: Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const { categoryName, categoryDescription } = req.body

        if (!categoryName || !categoryDescription) {
            res.status(400).json({
                message: "Please provide categoryName,categoryDescription"
            })

        }
        await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES(?,?)`, {
            type:QueryTypes.INSERT,
            replacements: [categoryName, categoryDescription]
        })
        res.status(200).json({
            message:"Category created successfully"
        })
    }

    static async deleteCategory(req: IExtendedRequest, res: Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const categoryId = req.params.id;
        await sequelize.query(`DELETE FROM category_${instituteNumber} WHERE ID=?`, {
            type:QueryTypes.DELETE,
            replacements: [categoryId]
        })
        res.status(200).json({
            message: "category deleted successfully"
        })
    }


    static async getCategory(req: IExtendedRequest, res: Response) {
        const instituteNumber = req.user?.currentInstituteNumber
        const categorys = await sequelize.query(`SELECT * FROM category_${instituteNumber}`,
            {
                type: QueryTypes.SELECT
            })
        res.status(200).json({
            message: "category Fetched",
            data: categorys || []
        })
    }




}
export default categoryController