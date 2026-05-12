import teachersModel from "../models/teachers.js"

const teacherController = {};

teacherController.getTeachers = async (req, res) => {
  try {
    const teachers = await teachersModel.find();
    return res.status(200).json(teachers);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

teacherController.updateTeacher = async (req, res) => {
  try {
    let {
     name,
      lastName,
      email,
      password,
      phone,
      speciality,
      isActive,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    name = name?.trim();
    lastName = lastName?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!name || !lastName || !email || !password) {
      return res.json(400).json({ message: "Fields required" });
    }

    if (name.length < 3 || name.length > 15) {
      return res.json(400).json({ message: "Insert a valid name" });
    }

    if (lastName.length < 3 || lastName.length > 15) {
      return res.json(400).json({ message: "Insert a valid lastName" });
    }

    const teacherUpdated = await teachersModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        email,
        password,
        birthDate,
        phone,
        grade,
        isVerified,
      },
      {
        new: true,
      },
    );

    if(!teacherUpdated){
        return res.status(400).json({message: "Teacher not found"});
    }

    return res.status(200).json({message: "Teacher Updated"});
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "Internal server error"});
  }
};

teacherController.deleteTeacher = async (req, res) =>{
    try {
        const deletedTeacher = await teachersModel.findByIdAndDelete(req.params.id);
        if(!deletedTeacher){
            return res.status(400).json({message: "Teacher not found"});
        }
        return res.status(200).json({message: "Teacher deleted"});
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"}); 
    }
};
export default teacherController