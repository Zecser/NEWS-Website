import express from "express";
import { adminLogin, adminLogout, getAdminProfile } from "../controllers/adminController.js";
import { deleteArticle, getAllArticles, updateArticle, createArticle, getArticleById } from "../controllers/articleController.js";
import {adminAuth} from "../middlewares/adminAuth.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

//admin login and logout
router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.get('/profile',adminAuth, getAdminProfile);

//articles
router.get('/articles',adminAuth, getAllArticles);
router.post('/articles', adminAuth, upload.single("image"), createArticle);
router.get('/articles/:id',adminAuth, getArticleById);
router.put('/articles/:id',adminAuth, updateArticle);
router.delete('/articles/:id',adminAuth, deleteArticle);  

export default router;
