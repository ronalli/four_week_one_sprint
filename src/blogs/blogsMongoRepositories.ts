import {BodyTypeBlog, QueryType, sortValue} from "../types/request-response-type";
import {blogCollection, postCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";
import {formatingDataForOutputBlog} from "../utils/fromatingData";
import {postsControllers} from "../posts/postsControllers";
import {postsMongoRepositories} from "../posts/postsMongoRepositories";

export const blogsMongoRepositories = {
    createBlog: async (blog: BodyTypeBlog) => {
        const newBlog = {
            ...blog,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        try {
            const insertedBlog = await blogCollection.insertOne(newBlog);
            const foundBlog = await blogCollection.findOne({_id: insertedBlog.insertedId})
            if (foundBlog) {
                return formatingDataForOutputBlog(foundBlog)
            }
            return;
        } catch (e) {
            console.log(e)
            return;
        }
    },
    findBlogById: async (id: string) => {
        try {
            const foundBlog = await blogCollection.findOne({_id: new ObjectId(id)});
            if (foundBlog) {
                return formatingDataForOutputBlog(foundBlog);
            }
            return;
        } catch (e) {
            // console.log(e)
            return;
        }

    },
    findAllBlogs: async () => {
        try {
            const foundedBlogs = await blogCollection.find({}).toArray()
            if (foundedBlogs.length > 0) {
                return foundedBlogs.map(blog => {
                    return formatingDataForOutputBlog(blog)
                })
            }
            return;
        } catch (e) {
            console.log(e)
            return;
        }
    },
    updateBlog: async (id: string, inputUpdateDataBlog: BodyTypeBlog) => {
        const {name, websiteUrl, description} = inputUpdateDataBlog
        try {
            const findBlog = await blogCollection.findOne({_id: new ObjectId(id)});
            if (findBlog) {
                await blogCollection.findOneAndUpdate({_id: new ObjectId(id)}, {
                    $set: {
                        name,
                        description,
                        websiteUrl
                    }
                });
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    deleteBlog: async (id: string) => {
        try {
            const flag = await blogCollection.findOne({_id: new ObjectId(id)});
            if (!flag) {
                return false;
            } else {
                await blogCollection.findOneAndDelete({_id: new ObjectId(id)});
                return true;
            }
        } catch (e) {
            console.log(e)
            return;
        }
    },
    searchAndSortPosts: async (blogId: string, queryParams: QueryType) => {
        const filter = {
            blogId,
        }

        try {
            const allPosts = await postCollection
                .find(filter)
                .sort(queryParams.sortBy as string, queryParams.sortDirection)
                .skip((queryParams.pageNumber-1)*queryParams.pageSize)
                .limit(queryParams.pageSize)
                .toArray();

            console.log(allPosts)

        } catch (e) {
            console.log("1", e)
        }

        return true;

    }
}