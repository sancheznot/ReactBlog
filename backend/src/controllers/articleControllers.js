const { validArt } = require("../helpers/validateArticle");
const Article = require("../models/Article");
const fs = require("fs");
const path = require("path");
const articleCtrl = {};

articleCtrl.prueba = (req, res) => {
  res.status(200).send("funciona");
};

articleCtrl.create = (req, res) => {
  // Get parameters to save the article
  const { title, content, image } = req.body;

  // validate data
  try {
    validArt(title, content);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Missing data",
    });
  }
  // Create object
  const article = new Article({ title, content, image });

  // To assign value in model
  // Saves article on database
  article.save((err, article) => {
    if (err || !article) {
      return res.status(400).json({
        status: "error",
        message: "Article don't save",
      });
    }
    // returns article
    return res.status(200).json({
      status: "success",
      article: article,
      message: "Article created",
    });
  });
};

articleCtrl.getArticles = (req, res) => {
  let gets = Article.find({})
    .sort({ date: -1 })
    .exec((err, articles) => {
      if (err || !articles) {
        return res.status(400).json({
          status: "error",
          message: "Articles not found",
        });
      }
      res.status(200).send({
        status: "success",
        counter: articles.length,
        articles,
      });
    });
};
articleCtrl.getArticle = (req, res) => {
  let id = req.params.id;
  Article.findById(id).exec((err, article) => {
    if (err || !article) {
      res.status(400).send({
        status: "error",
        message: "Article not found",
      });
    }
    res.status(200).json({
      status: "success",
      article,
    });
  });
};

articleCtrl.deleteArticle = (req, res) => {
  let id = req.params.id;
  Article.findByIdAndDelete({ _id: id }).exec((err, article) => {
    if (err || !article) {
      res.status(400).json({
        status: "error",
        message: "We tried delete but article not found",
      });
    }
    res.status(200).json({
      status: "success",
      article,
      message: "Article deleted successfully",
    });
  });
};

articleCtrl.updateArticle = (req, res) => {
  let id = req.params.id;
  const { title, content, image } = req.body;

  // validate data
  try {
    validArt(title, content);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Missing data",
    });
  }
  Article.findByIdAndUpdate(
    { _id: id },
    { title, content, image: image },
    { new: true }
  ).exec((err, articleupdated) => {
    if (err || !articleupdated) {
      res.status(400).json({
        status: "error",
        message: "We cannot find the article and cannot update",
      });
    }
    res.status(200).json({
      status: "success",
      article: articleupdated,
      message: "Update data successfully",
    });
  });
};

articleCtrl.imgUpload = (req, res) => {
  // Name of files to upload
  let files = req.file.originalname;
  // Ext of files to upload
  let filesSplit = files.split(".");
  let filesExt = filesSplit[1];
  // If correct file extension
  if (
    filesExt !== "jpg" &&
    filesExt !== "png" &&
    filesExt !== "gif" &&
    filesExt !== "jpeg"
  ) {
    // Delete files with wrong extension
    fs.unlink(req.file.path, (err) => {
      return res.status(400).json({
        status: "error",
        message: "File extension is wrong",
      });
    });
  } else {
    // Find id
    let fileId = req.params.id;
    Article.findOneAndUpdate(
      { _id: fileId },
      { image: req.file.filename },
      { new: true }
    ).exec((err, fileupdated) => {
      if (err || !fileupdated) {
        res.status(400).json({
          status: "error",
          message: "We cannot find the article and cannot update",
        });
      }
      return res.status(200).json({
        status: "success",
        files: req.file,
        message: "Upload image",
      });
    });
  }
};

articleCtrl.findImg = (req, res) => {
  let file = req.params.file;
  let pathFile = "./src/img/articles/" + file;
  fs.stat(pathFile, (error, exists) => {
    if (exists) {
      return res.sendFile(path.resolve(pathFile));
    } else {
      return res.status(400).json({
        status: "error",
        message: "Image not exists",
      });
    }
  });
};
articleCtrl.searchArt = (req, res) => {
  // String
  let search = req.params.search;
  // Find Or
  Article.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ],
  }) // Order // Execute
    .sort({ date: -1 })
    .exec((err, results) => {
      if (err || !results || results.length <= 0) {
        // Return
        return res.status(400).json({
          status: "error",
          message: "No results",
        });
      }
      return res.status(200).json({
        status: "success",
        count: results.length,
        results,
      });
    });
};

module.exports = articleCtrl;
