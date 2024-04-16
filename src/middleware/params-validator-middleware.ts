import {param} from "express-validator";
import {blogCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const validatorParamBlogId = param("id")
    .custom(value => !!blogCollection.find({_id: new ObjectId(value)}))
    .withMessage('Blog ID is incorrect');