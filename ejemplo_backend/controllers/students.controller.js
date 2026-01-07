import { studentSchema } from "../models/student.model.js";

export const createStudent = async (req, res) => {
  try {
    const newStudent = new studentSchema(req.body);
    if (newStudent.password) {
      passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(newStudent.password)) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long and contain both letters and numbers",
        });
      }
    }
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

export const getStudents = async (req, res) => {
  try {
    const filter = {};
    let students;
    if (req.query.first_name) {
      filter.first_name = req.query.first_name;
    }
    if (req.query.last_name) {
      filter.last_name = req.query.last_name;
    }
    if (req.query.email) {
      filter.email = req.query.email;
    }
    if (req.query.course) {
      students = await studentSchema.paginate({
        ...filter,
        courses: { $in: [req.query.course] },
      }, {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
      });
    } else {
      students = await studentSchema.paginate(filter, {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
      });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving students", error });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await studentSchema.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving student", error });
  }
};

export const updateStudent = async (req, res) => {
  try {
    // Validate password if it's being updated
    if (req.body.password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long and contain both letters and numbers",
        });
      }
    }
    // Update student and update the modification history
    const updatedStudent = await studentSchema.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await studentSchema.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deleted_at: new Date(),
      deleted_by: req.body.deleted_by,
    });
    res.status(200).json({ message: "Student soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
