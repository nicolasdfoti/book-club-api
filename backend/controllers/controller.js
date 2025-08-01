const mongodb = require("../data/db.js");
const ObjectId = require("mongodb").ObjectId;

const getAllBooks = async (req, res) => {

    try {
        const result = await mongodb.getDb.db().collection("books");
        const books = await result.toArray();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({error: "Error fetching the books", details: err});
    }
}

const getSingleBook = async (req, res) => {

    try {
        bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDb.db().collection("books").find({_id: bookId});
        const books = await result.toArray();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({error: "Error fetching the books", details: err});
    }
}

module.exports = {getAllBooks, getSingleBook};