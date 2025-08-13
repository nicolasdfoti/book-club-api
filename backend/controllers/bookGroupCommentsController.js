const mongodb = require("../data/db");
const ObjectId = require("mongodb").ObjectId;
const { bookGroupCommentValidation } = require("../utils/validation.js");

const getAllBookGroupComments = async (req, res) => {
  try {
    const database = await mongodb.getDb();
    const cursor = database.collection("book_group_comments").find();
    const comments = await cursor.toArray();
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching book group comments:", err);
    res.status(500).json({
      error: "Error fetching book group comments",
      details: err.message,
    });
  }
};

const getSingleBookGroupComment = async (req, res) => {
  try {
    const commentId = new ObjectId(req.params.id);
    const database = await mongodb.getDb();
    const comment = await database
      .collection("book_group_comments")
      .findOne({ _id: commentId });
    if (!comment) {
      return res.status(404).json({ error: "Book group comment not found" });
    }
    res.status(200).json(comment);
  } catch (err) {
    console.error("Error fetching book group comment:", err);
    res.status(500).json({
      error: "Error fetching book group comment",
      details: err.message,
    });
  }
};

const createBookGroupComment = async (req, res) => {
  const comment = {
    commentText: req.body.commentText,
    userName: req.body.userName,
    bookGroupId: req.body.bookGroupId,
    commentDate: new Date(req.body.commentDate),
  };
  try {
    const { error } = bookGroupCommentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const database = await mongodb.getDb();
    const result = await database
      .collection("book_group_comments")
      .insertOne(comment);
    res.status(201).json({
      message: "Book group comment created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating book group comment:", error);
    return res.status(500).json({
      message: "Error creating book group comment",
      error: error.message,
    });
  }
};

const deleteBookGroupComment = async (req, res) => {
  try {
    const commentId = new ObjectId(req.params.id);
    const database = await mongodb.getDb();
    const result = await database
      .collection("book_group_comments")
      .deleteOne({ _id: commentId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Book group comment not found" });
    }
    res
      .status(200)
      .json({ message: "Book group comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting book group comment:", err);
    res.status(500).json({
      error: "Error deleting book group comment",
      details: err.message,
    });
  }
};

const updateBookGroupComment = async (req, res) => {
  try {
    const commentId = new ObjectId(req.params.id);
    const database = await mongodb.getDb();
    const comment = {
      commentText: req.body.commentText,
      userName: req.body.userName,
      bookGroupId: req.body.bookGroupId,
      commentDate: new Date(req.body.commentDate),
    };
    const { error } = bookGroupCommentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await database
      .collection("book_group_comments")
      .updateOne({ _id: commentId }, { $set: comment });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Book group comment not found" });
    }
    res
      .status(200)
      .json({ message: "Book group comment updated successfully" });
  } catch (err) {
    console.error("Error updating book group comment:", err);
    res.status(500).json({
      error: "Error updating book group comment",
      details: err.message,
    });
  }
};

module.exports = {
  getAllBookGroupComments,
  getSingleBookGroupComment,
  createBookGroupComment,
  deleteBookGroupComment,
  updateBookGroupComment,
};
