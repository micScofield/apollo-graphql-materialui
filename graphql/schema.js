const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        creator: String!
        createdAt: String!
        updatedAt: String!
    }

    type PostsData {
        posts: [Post!]!
        totalPosts: Int!
    }

    input PostInputData {
        title: String!
        content: String!
        creator: String!
    }

    type RootQuery {
        posts(page: Int): PostsData!
        post(id: String): Post!
    }

    type RootMutation {
        createPost(postInput: PostInputData): Post!
        updatePost(id: String, postInput: PostInputData): Post!
        deletePost(id: String): Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
