export type ParamType = {
    id: string
}

enum sortValue {
    asc,
    desc
}

export type BodyTypePost = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type BodyTypeBlog = {
    name: string
    description: string
    websiteUrl: string
}

export type QueryType = {
   pageNumber?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: sortValue
}