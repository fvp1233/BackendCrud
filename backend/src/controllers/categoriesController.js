import categoryModel from "../models/category.js";

const categoryController = {};

categoryController.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoryController.insertCategory = async (req, res) => {
  try {
    let { categoryName, description, color, isActive } = req.body;

    const newCategory = new categoryModel({
      categoryName,
      description,
      color,
      isActive,
    });
    await newCategory.save();
    return res.status(200).json({ message: "Category saved" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoryController.updateCategory = async (req, res) => {
  try {
    let { categoryName, description, color, isActive } = req.body;

    const categoryUpdated = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        categoryName,
        description,
        color,
        isActive,
      },
      {
        new: true,
      },
    );

    if (!categoryUpdated) {
      return res.status(400).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category Updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoryController.deleteCategory = async (req, res) =>{
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
        if(!deletedCategory){
            return res.status(400).json({message: "Category not found"});
        }
        return res.status(200).json({message: "Category deleted"});
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"}); 
    }
};

export default categoryController