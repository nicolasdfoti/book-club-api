const mongodb = require("../data/db");
const ObjectId = require("mongodb").ObjectId;
const { bookValidation } = require("../utils/validation.js");
const { userValidation } = require("../utils/validation.js");

// functions to books database

const getAllBooks = async (req, res) => {
  try {
    const database = await mongodb.getDb();
    const cursor = database.collection("books").find();
    const books = await cursor.toArray();
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching the books:", err);
    res.status(500).json({ error: "Error fetching the books", details: err.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const database = await mongodb.getDb();
    const book = await database.collection("books").findOne({ _id: bookId });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching the book:", err);
    res.status(500).json({ error: "Error fetching the book", details: err.message });
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
    const result = await database.collection("books").insertOne(book);
    res.status(201).json({
      message: "Book created successfully",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error in inserting a new book:", error);
    return res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const db = await mongodb.getDb();
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
    const db = await mongodb.getDb();
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

// functions to users database

const getAllUsers = async (req, res) => {
  try {
    const database = await mongodb.getDb();
    const cursor = database.collection("users").find();
    const users = await cursor.toArray();
    res.status(200).json(users);
  } catch (err) {
    console.log("Error fetching the users: ", err);
    res.status(500).json({ error: "Error fetching the users", details: err.message});
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const database = await mongodb.getDb();
    const user = await database.collection("users").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({error: "User not found"});
    } else {
      res.status(200).json(user);
    } 
  } catch (err) {
    console.log("Error fetching the user", err);
    res.status(500).json({ error: "Error fetching the user", details: err.message })
  }
}

const createUser = async (req, res) => {
  const user = {
    userName: req.body.userName,
    userSurname: req.body.userSurname,
    userAge: req.body.userAge
  };
  try {
    const {error} = userValidation.validate(req.body);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    const database = await mongodb.getDb();
    const result = await database.collection("users").insertOne(user);
    res.status(201).json({
      message: "User successfully created",
      id: result.insertedId
    })
  } catch (error) {
    console.error("Error creating the user", error);
    return res
      .status(500)
      .json({ message: "Error creating the user", error: error.message });
  }
}

const updateUser = async (req, res) => {

  try {
    const database = await mongodb.getDb();
    const userId = req.params.id;
    const user = {
      userName: req.body.userName,
      userSurname: req.body.userSurname,
      userAge: req.body.userAge
    };
    const {error} = userValidation.validate(user);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await database
      .collection("users")
      .replaceOne({ _id: new ObjectId(userId) }, user);
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "User not found or no changes made" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user information" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const database = await mongodb.getDb();
    const userId = req.params.id;

    const result = await database
      .collection("users")
      .deleteOne({_id: new ObjectId(userId)});

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({message: "User deleted successfully"});
  } catch (error) {
    res.status(500).json({ error: "Error deleting the user" });
  }
}

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};

