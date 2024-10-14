import Category from "../models/category.js";

export function createCategory(req, res) {
  if (req.user == null) {
    res.status(400).json({
      message: "Unauthorized",
    });
    return;
  }
  if (req.user.type != "admin") {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }
  const newCategory = new Category(req.body);
  newCategory
    .save()
    .then((result) => {
      res.json({
        message: "Category created successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Category creation failed",
        error: err,
      });
    });
}
