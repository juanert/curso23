import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from "../controllers/students.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", createStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;