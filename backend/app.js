import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import registerStudentRoutes from "./src/routes/registerStudent.js";
import studentsRoutes from "./src/routes/students.js"
import loginStudents from "./src/routes/loginStudents.js"

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

export default app