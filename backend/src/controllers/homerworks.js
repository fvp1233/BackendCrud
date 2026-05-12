import homeworksModel from "../models/homeworks.js";

const homeworkController = {};

homeworkController.getHomeworks = async (req, res) => {
  try {
    const homeworks = await homeworksModel.find();
    return res.status(200).json(homeworks);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

homeworkController.insertHomework = async (req, res) => {
  try {
    let { tittle, description, dueDate, priority, status } = req.body;

    const newHomework = new homeworksModel({
      tittle,
      description,
      dueDate,
      priority,
      status,
    });
    await newHomework.save();
    return res.status(200).json({ message: "Homework saved" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

homeworkController.updateHomework = async (req, res) => {
  try {
    let { tittle, description, dueDate, priority, status } = req.body;

    const homeworkUpdated = await homeworksModel.findByIdAndUpdate(
      req.params.id,
      {
        tittle,
        description,
        dueDate,
        priority,
        status,
      },
      {
        new: true,
      },
    );

    if (!homeworkUpdated) {
      return res.status(400).json({ message: "Homework not found" });
    }

    return res.status(200).json({ message: "Homework Updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

homeworkController.deleteHomework = async (req, res) =>{
    try {
        const deletedHomework = await homeworksModel.findByIdAndDelete(req.params.id);
        if(!deletedHomework){
            return res.status(400).json({message: "Homework not found"});
        }
        return res.status(200).json({message: "Homework deleted"});
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"}); 
    }
};

export default homeworkController
