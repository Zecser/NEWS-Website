import express from "express";
import { getSingleArticle, getArticles, getBookmarks, addBookmark, deleteBookmark, addcreatepost, userRegister, userLogin, logout, googleLogin, getUserInfo, editUser } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import multerMiddleware from "../middlewares/userMulter.js";

const router = express.Router();

//user
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', logout);

//user profile
router.get('/user/me',userAuth, getUserInfo);
router.put('/users/:id', multerMiddleware.single("imageUrl"), userAuth, editUser);

//google auth
router.post('/google-login', googleLogin);

//articles
router.get('/articles', getArticles);
router.get('/articles/:id', userAuth, getSingleArticle); 
router.post('/articles',userAuth, addcreatepost);

//bookmarks
router.get('/bookmarks/:id', getBookmarks);
router.post('/bookmarks', addBookmark);
router.delete('/bookmarks/:id', deleteBookmark);


export default router;