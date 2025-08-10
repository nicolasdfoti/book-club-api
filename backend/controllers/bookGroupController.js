const mongodb = require("../data/db");
const ObjectId = require("mongodb").ObjectId;
const { bookGroupValidation } = require("../utils/validation.js");

const getAllBookGroups = async (req, res) => {
  try {
    const database = await mongodb.getDb();
    const cursor = database.collection("book_group").find();
    const bookGroups = await cursor.toArray();
    res.status(200).json(bookGroups);
  } catch (err) {
    console.error("Error fetching the book groups:", err);
    res
      .status(500)
      .json({ error: "Error fetching the book groups", details: err.message });
  }
};

const getSingleBookGroup = async (req, res) => {
  try {
    const bookGroupId = new ObjectId(req.params.id);
    const database = await mongodb.getDb();
    const bookGroup = await database
      .collection("book_group")
      .findOne({ _id: bookGroupId });
    if (!bookGroup) {
      return res.status(404).json({ error: "Book group not found" });
    }
    res.status(200).json(bookGroup);
  } catch (err) {
    console.error("Error fetching the book group:", err);
    res
      .status(500)
      .json({ error: "Error fetching the book group", details: err.message });
  }
};

const createBookGroup = async (req, res) => {
  //#swagger.tag=['BookGroups']
  const bookGroup = {
    groupName: req.body.groupName,
    groupDescription: req.body.groupDescription,
    bookName: req.body.bookName,
    groupMembers: req.body.groupMembers,
  };
  try {
    const { error } = bookGroupValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const database = await mongodb.getDb();
    const result = await database.collection("book_group").insertOne(bookGroup);
    res.status(201).json({
      message: "Book group created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error in inserting a new book group:", error);
    return res
      .status(500)
      .json({ message: "Error creating the book group", error: error.message });
  }
};

const updateBookGroup = async (req, res) => {
  try {
    const database = await mongodb.getDb();
    const bookGroupId = req.params.id;
    const bookGroup = {
      groupName: req.body.groupName,
      groupDescription: req.body.groupDescription,
      bookName: req.body.bookName,
      groupMembers: req.body.groupMembers,
    };
    const { error } = bookGroupValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await database
      .collection("book_group")
      .updateOne({ _id: new ObjectId(bookGroupId) }, { $set: bookGroup });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Book group not found" });
    }
    res.status(200).json({ message: "Book group successfully updated" });
  } catch (error) {
    console.error("Error updating the book group:", error);
    return res
      .status(500)
      .json({ message: "Error updating the book group", error: error.message });
  }
};

const deleteBookGroup = async (req, res) => {
  try {
    const database = await mongodb.getDb();
    const bookGroupId = req.params.id;
    const result = await database
      .collection("book_group")
      .deleteOne({ _id: new ObjectId(bookGroupId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Book group not found" });
    }
    res.status(200).json({ message: "Book group successfully deleted" });
  } catch (error) {
    console.error("Error deleting the book group:", error);
    return res
      .status(500)
      .json({ message: "Error deleting the book group", error: error.message });
  }
};

module.exports = {
  getAllBookGroups,
  getSingleBookGroup,
  createBookGroup,
  updateBookGroup,
  deleteBookGroup,
};
