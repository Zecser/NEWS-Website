import Article from "../models/articleModel.js";

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createArticle = async (req, res) => {
  try {
    console.log("inside create article");
    console.log(req.body);
    const {
      title,
      caption,
      category,
      country,
      state,
      district,
      language,
      status,
    } = req.body;


    if (!title || !caption || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const imageUrl = req.file?.path; // Cloudinary gives `path` as the image URL

    const newArticle = new Article({
      title,
      caption,
      category,
      imageUrl,
      country,
      state,
      district,
      language,
      status,
    });

    await newArticle.save();
    res.status(201).json({ message: "Article created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid Data" });
    console.log("error in create article", err.message); // Pretty print the object

  }
};


export const updateArticle = async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
