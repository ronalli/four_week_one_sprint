import {body, query, param} from 'express-validator'
import {BlogOutputType} from "../types/output-blog-type";

const validationTitle = body('name').trim().notEmpty().withMessage('Field name is empty').isLength({
    max: 15
}).withMessage('Name filed should be max 15 symbols');

const validatorDescription = body('description').trim().notEmpty().withMessage('Field description is empty').isLength({
    max: 500
}).withMessage('Description filed should be max 500 symbols');

const validationWebsiteUrl = body('websiteUrl').trim().notEmpty().withMessage('Field websiteUrl is empty').isLength({
    max: 100
}).custom((value) => {
    const regexp = new RegExp('^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$', 'g');
    return regexp.test(value);
}).withMessage('Field is not correct url');

const validatorQuery = query('sortBy').custom(value => {
    const Query: Array<keyof BlogOutputType> = ["createdAt", "description", "id", "isMembership", "name", "websiteUrl"]
    return Query.includes(value);
}).withMessage('Field sortBy incorrect')



export const validationCreateBlog = [validationTitle, validatorDescription, validationWebsiteUrl];

export const validationQueryParams = [validatorQuery]


