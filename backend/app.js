import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import registerStudentRoutes from "./src/routes/registerStudent.js";
import studentsRoutes from "./src/routes/students.js"
import loginStudents from "./src/routes/loginStudents.js"
import registerTeacherRoutes from "./src/routes/registerTeacher.js"
import teachersRoute from "./src/routes/teachers.js"
import loginTeachers from "./src/routes/loginTeachers.js"
import logoutRoutes from "./src/routes/logout.js"



const app = express();

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174" ],
    credentials: true
}))

app.use(cookieParser());

app.use(express.json());

app.use("/api/registerStudent", registerStudentRoutes)
app.use("/api/students", studentsRoutes)
app.use("/api/loginStudens", loginStudents)

app.use("/api/registerTeacher", registerTeacherRoutes)
app.use("/api/teachers", teachersRoute)
app.use("/api/loginTeachers", loginTeachers)

app.use("/api/logout", logoutRoutes)


export default app