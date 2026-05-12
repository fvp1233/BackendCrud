import studentsModel from "../models/students.js";

const studentController = {};

studentController.getStudents = async (req, res) => {
  try {
    const students = await studentsModel.find();
    return res.status(200).json(students);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

studentController.updateStudent = async (req, res) => {
  try {
    let {
      name,
      lastName,
      email,
      password,
      birthDate,
      phone,
      grade,
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

    const studentUpdated = await studentsModel.findByIdAndUpdate(
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

    if(!studentUpdated){
        return res.status(400).json({message: "Student not found"});
    }

    return res.status(200).json({message: "Student Updated"});
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "Internal server error"});
  }
};

studentController.deleteStudent = async (req, res) =>{
    try {
        const deletedStudent = await studentsModel.findByIdAndDelete(req.params.id);
        if(!deletedStudent){
            return res.status(400).json({message: "Student not found"});
        }
        return res.status(200).json({message: "Student deleted"});
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"}); 
    }
};
export default studentController
