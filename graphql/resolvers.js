const validator = require("validator");
const post = require("../models/post");

module.exports = {
  createPost: async function ({ postInput: { title, content, creator } }) {
    // Add input validation here
    const errors = [];
    if (validator.isEmpty(title) || !validator.isLength(title, { min: 2 })) {
      errors.push({ message: "Title too short!" });
    }

    if (
      validator.isEmpty(creator) ||
      !validator.isLength(creator, { min: 2 })
    ) {
      errors.push({ message: "creator too short!" });
    }

    if (
      validator.isEmpty(content) ||
      !validator.isLength(content, { min: 5 })
    ) {
      errors.push({ message: "Content too short!" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input provided.");
      error.data = errors;
      error.code = 422; // or 400
      throw error;
    }

    // Resolver Logic
    const newPost = new post({
      title,
      content,
      creator,
    });

    const createdPost = await newPost.save();

    return {
      ...createdPost._doc,
      id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  },
  posts: async function ({ page }) {
    if (!page) {
      page = 1;
    }

    // const POSTS_PER_PAGE = 4;

    const totalPosts = await post.find().count();
    const existingPosts = await post
      .find({})
      // .skip((page - 1) * POSTS_PER_PAGE)
      // .limit(POSTS_PER_PAGE)
      .sort({ createdAt: -1 });

    return {
      totalPosts,
      posts: existingPosts.map((p) => {
        return {
          ...p._doc,
          _id: p._id.toString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      }),
    };
  },
  post: async function ({ id }) {
    console.log("here", id, typeof id);
    const existingPost = await post.findById(id);
    console.log(existingPost);
    if (!existingPost) {
      const error = new Error("Post Not Found");
      error.code = 404;
      throw error;
    }

    return {
      ...existingPost._doc,
      id: existingPost._id.toString(),
      createdAt: existingPost.createdAt.toISOString(),
      updatedAt: existingPost.updatedAt.toISOString(),
    };
  },
  updatePost: async function ({ id, postInput: { title, content, creator } }) {
    console.log("HERE", id, title, content, creator);
    if (!id) {
      const error = new Error("No ID received");
      error.code = 400;
      throw error;
    }

    const errors = [];
    if (validator.isEmpty(title) || !validator.isLength(title, { min: 2 })) {
      errors.push({ message: "Title too short!" });
    }

    if (
      validator.isEmpty(creator) ||
      !validator.isLength(creator, { min: 2 })
    ) {
      errors.push({ message: "creator too short!" });
    }

    if (
      validator.isEmpty(content) ||
      !validator.isLength(content, { min: 5 })
    ) {
      errors.push({ message: "Content too short!" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input provided.");
      error.data = errors;
      error.code = 422; // or 400
      throw error;
    }

    const existingPost = await post.findById(id);

    if (!existingPost) {
      const error = new Error("Post Not Found");
      error.code = 404;
      throw error;
    }

    // existingPost.title = title
    // existingPost.creator = creator
    // existingPost.content = content

    // const updatedPost = await existingPost.save()
    // console.log('updated', updatedPost)

    const postFields = {};
    postFields.title = title;
    postFields.creator = creator;
    postFields.content = content;

    let updatedPost = await post.findOneAndUpdate(
      { _id: id },
      { $set: postFields },
      { new: true }
    );
    console.log(updatedPost)
    return {
      ...updatedPost._doc,
      id: updatedPost._id.toString(),
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    };
  },
  deletePost: async function ({ id }) {
    console.log('deletepost', id)
    const existingPost = await post.findById(id);
    console.log(existingPost)
    if (!existingPost) {
      const error = new Error("Post Not Found");
      error.code = 404;
      throw error;
    }

    try {
      await post.findByIdAndRemove(id);
      console.log('deleted')
      return true;
    } catch (err) {
      return false;
    }
  },
};
