var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var expressJwt = require('express-jwt');

var postSchema = mongoose.Schema({
  title: String,
  categories: [String],
  content: String,
  authorName: String,
  authorUsername: String,
  authorId: String
});

postSchema.plugin(timestamps);

var Post = mongoose.model('Post', postSchema);

router.get('/posts', function(req, res, next){
  Post.find({})
      .select({
        content:0,
        __v:0,
        updatedAt:0,
        createdAt:0
      })
      .limit(100)
      .sort({createdAt:-1})
      .exec(function(err, posts) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Could not retrieve posts'
          });
        }
        res.json(posts);
      });
});

router.post('/posts', function(req, res, next) {
  //use the middleare get the user and authorisation
  // var user = req.user;
  // if (!user) {
  //   return res.status(401).json({
  //     message: 'Permission Denied!'
  //   });
  // } else if (!user.isEmailVerified) {
  //   return res.status(401).json({
  //     message: 'Permission Denied! Please verify your email.'
  //   });
  // }

  var body = req.body;
  var title = body.title;
  var categories = body.categories;
  var content = body.content;

  //validation
  if (!title || !categories || !content) {
      return res.status(400).json({
        message: 'Error title, categories and content are all required!'
      });
  }

  var post = new Post({
    title: title,
    categories: categories.split(','),
    content: content,
    authorName: req.user.name,
    authorUsername: req.user.username,
    authorId: req.user._id,
    authorImage: req.user.image
  });

  post.save(function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not save post'
      });
    }
    res.json(post);
  }); //end save

});//end route

router.get('/posts/:id', function(req, res, next){
  Post.findById({
    '_id': req.params.id
  }, function(err, post){
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve post w/ that id'
      });
    }
    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      })
    }
    res.json(post);
  });//end findById
});

router.delete('/posts/:id', function(req, res, next){
  //authorisation
  // if (!req.user || !req.user.isEmailVerified) {
  //   return res.status(401).json({
  //     message: 'Permission Denied!'
  //   });
  // }

  var id = req.params.id;
  if (id.length != 24) {
    return res.json({
      message: 'id must be a valid 24 char hex string'
    });
  }

  var id = mongoose.Types.ObjectId(req.params.id);
  Post.findByIdAndRemove(id, function(err, post) {
      if (err)
        throw err;

      if (!post) {
        return res.status(404).json({
          message: 'Could not delete post'
        });
      }

      res.json({
        result: 'Post was deleted'
      });
    }); //end find
  }); //end route

module.exports = router;
