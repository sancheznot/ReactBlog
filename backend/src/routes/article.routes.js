const {Router} = require('express');
const { prueba, create, getArticles, getArticle, deleteArticle, updateArticle, imgUpload, findImg, searchArt } = require('../controllers/articleControllers');
const uploader = require('../middlewares/filesArt');
const router = Router()

// Test router
router.get('/prueba', prueba)

// Routers
router.post('/create', create)
router.get('/posts', getArticles)
router.get('/posts/:id', getArticle)
router.delete('/posts/:id', deleteArticle)
router.put('/posts/edit/:id', updateArticle)
router.post('/upload/:id',[uploader.single("file0")] ,  imgUpload)
router.get('/img/:file', findImg)
router.get('/search/:search', searchArt)



module.exports = router