import {Router} from 'express';
import {blogsControllers} from "../blogs/blogsControllers";
import {validationCreateBlog, validationQueryParams} from "../middleware/input-validation-blog-middleware";
import {authMiddleware} from "../middleware/auth-middleware";
import {inputCheckErrorsMiddleware} from "../middleware/inputCheckErrorsMiddleware";

export const blogsRouter = Router({});

blogsRouter.get('/', ...validationQueryParams, inputCheckErrorsMiddleware, blogsControllers.getBlogs)
blogsRouter.get('/:id', blogsControllers.getBlog)
blogsRouter.post('/', authMiddleware, ...validationCreateBlog, inputCheckErrorsMiddleware, blogsControllers.createBlog)
blogsRouter.put('/:id', authMiddleware, ...validationCreateBlog, inputCheckErrorsMiddleware, blogsControllers.updateBlog)
blogsRouter.delete('/:id', authMiddleware, blogsControllers.deleteBlog)

blogsRouter.get('/:id/posts', ...validationQueryParams, inputCheckErrorsMiddleware, blogsControllers.getAllPostsForBlog)

blogsRouter.post('/:id/posts', authMiddleware, blogsControllers.createPostForSpecialBlog)