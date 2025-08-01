const mongodb = require("../data/db");
const ObjectId = require("mongodb").ObjectId;
const { bookValidation } = require("../utils/validation");

const getAllBooks = async (req, res) => {
  try {
    const result = await mongodb.getDb.db().collection("books");
    const books = await result.toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Error fetching the books", details: err });
  }
};

const getSingleBook = async (req, res) => {
  try {
    bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb
      .db()
      .collection("books")
      .find({ _id: bookId });
    const books = await result.toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Error fetching the books", details: err });
  }
};

const createBook = async (req, res) => {
  //#swagger.tag=['Books']
  const book = {
    bookName: req.body.bookName,
    author: req.body.author,
    publishedDate: req.body.publishedDate,
    numberPages: req.body.numberPages,
  };
  try {
    const { error } = bookValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const database = await mongodb.getDb();
    const response = await database.collection("books").insertOne(book);
    response.setHeader("Content-Type", "application/json");
    response.status(201).json({
      message: "Book created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error in inserting a new book:", error);
    return res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const db = getDb();
    const bookID = req.params.id;

    const book = {
      bookName: req.body.bookName,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      numberPages: req.body.numberPages,
    };
    // Validate the updated data
    const { error } = bookValidation.validate(book);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await db
      .collection("books")
      .replaceOne({ _id: new ObjectId(bookID) }, book);

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Book not found or no changes made" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating book in the database" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const db = getDb();
    const bookID = req.params.id;

    const result = await db
      .collection("books")
      .deleteOne({ _id: new ObjectId(bookID) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting book from the database" });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
