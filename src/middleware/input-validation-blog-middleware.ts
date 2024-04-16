import {body, query, param} from 'express-validator'
import {BlogOutputType} from "../types/output-blog-type";
import {sortDirection} from "../types/request-response-type";
import {PostOutputType} from "../types/output-post-type";

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

const validatorQuerySortByBlogs = query('sortBy').optional().custom(value => {
    const query: Array<keyof BlogOutputType> = ["createdAt", "description", "id", "isMembership", "name", "websiteUrl"]
    return query.includes(value);
}).withMessage('Field sortBy incorrect')

const validatorQuerySortByPost = query('sortBy').optional().custom(value => {
    const query: Array<keyof PostOutputType> = ["createdAt", "blogId", "blogName", "content", "title", "shortDescription", "id"]
    return query.includes(value);
}).withMessage('Field sortBy incorrect')

const validatorQueryPageNumber = query('pageNumber').optional().isInt().withMessage('Field pageNumber is incorrect');
const validatorQueryPageSize = query('pageSize').optional().isInt().withMessage('Field pageSize is incorrect');
const validatorQuerySearchNameTerm = query('searchNameTerm').optional().isString().withMessage('Field pageSize is incorrect');
const validatorQuerySortDirection = query('sortDirection').optional().custom(value => sortDirection.hasOwnProperty(value)).withMessage('Field sortDirection is incorrect');


export const validationCreateBlog = [validationTitle, validatorDescription, validationWebsiteUrl];

export const validationQueryParamsBlogs = [validatorQuerySortByBlogs, validatorQueryPageNumber, validatorQueryPageSize, validatorQuerySearchNameTerm, validatorQuerySortDirection]
export const validationQueryParamsPosts = [validatorQuerySortByPost, validatorQueryPageNumber, validatorQueryPageSize, validatorQuerySearchNameTerm, validatorQuerySortDirection]


