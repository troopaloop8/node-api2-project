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

router.post("/", (req, res) => {

    if (!req.body.title || !req.body.contents) {
        res.status(400).json({error: "You need a title and contents in order to post, bruh."})
    }
    insert(req.body)
    .then((post) => {
        res.status(200).json(post)
    })
    .catch((err) => {
        res.status(500).json({ error: `Something went wrong... ${err}`})
    })
});


//   | POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.|

router.post("/:id/comments", (req, res) => {
    const { id } = req.params;
    const comment = req.body;

    if (!comment.text) {
        res.status(400).json({ message: "You gotta actually have some text in your commnet, bruh"})
    }

    findById(id)
    .then(post => {
        if (post.length !== 0) {
            insertComment(comment)
            .then(msg => {
                res.status(201).json({...msg, ...comment});
            })
            .catch(err => {
                res.status(500).json({ error: `Something went wrong... ${err}`});
            })
        } else {
            res.status(404).json({ error: "The post with this ID ain't here"})
        }
    })

})



//   | GET    | /api/posts              | Returns an array of all the post objects contained in the database.|

router.get("/", (req, res) => {
    find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: `Something went wrong... ${err}`});
    });
});


//   | GET    | /api/posts/:id          | Returns the post object with the specified id.|

router.get("/:id", (req, res) => {
    const { id } = req.params;
    findById(id)
    .then(post => {
        // if (post) {
        //     res.status(200).json(post);
        // } else if (!post) {
        //     res.status(404).json({ message: "Post with specified ID does not exist."})
        // }
        post ? res.status(200).json(post) : res.status(404).json({ message: "Post with specified ID does not exist."});
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: `Something went wrong... ${err}`});
    })
})



//   | GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.|

router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    findById(id)
      .then((post) => {
        post.length > 0
          ? findPostComments(id)
              .then((comment) => {
                comment.length > 0
                  ? res.status(200).json(comment)
                  : res
                      .status(404)
                      .json({ error: "this post doesn't have any comments" });
              })
              .catch((err) => {
                res.status(500).json({
                  error: "Hey, something happened and we don't know what",
                });
              })
          : res.status(404).json({ error: "this ID doesn't exist, sorry" });
      })
      .catch((err) => {
        res.status(500).json({ error: `Something went wrong... ${err}`});
      });
  });



//   | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. 
// You may need to make additional calls to the database in order to satisfy this requirement. |

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    remove(id)
    .then(post => {
        post > 0
        ? res.status(200).json({ message: "The post has been erased from existence"})
        : res.status(404).json({ error: "this ID doesn't exist, sorry"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: `Something went wrong... ${err}`});
    });
});


//   | PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.

router.put("/:id", (req, res) => {
    const {id} = req.params;

    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ error: "You need a title and comments for the post, bruh."})
    }

    findById(id)
    .then(post => {
        if (post.length > 0) {
            update(id, {
                title: req.body.title,
                contents: req.body.contents
            })
            .then(update => {
                findById(id)
                .then(post => {
                    res.status(200).json(post)
                })
                .catch(err => {
                    res.status(500).json({error: `Something went wrong... ${err}`})
                })
            })
            .catch(err => {
                res.status(500).json({error: `Something went wrong... ${err}`})
            })
        } else {
            res.status(404).json({error: "Post with this ID does not exist..."})
        }
    })
    .catch(err => {
        res.status(500).json({error: `Something went wrong... ${err}`})
    })
});


module.exports = router;