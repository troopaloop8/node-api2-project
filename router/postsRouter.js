const express = require('express');

const router = express.Router();

const {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,
  } = require("../data/db.js");

//   | POST   | /api/posts              | Creates a post using the information sent inside the `request body`.|




//   | POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.|




//   | GET    | /api/posts              | Returns an array of all the post objects contained in the database.|




//   | GET    | /api/posts/:id          | Returns the post object with the specified id.|




//   | GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.|




//   | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. 
// You may need to make additional calls to the database in order to satisfy this requirement. |




//   | PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.


module.exports = router;