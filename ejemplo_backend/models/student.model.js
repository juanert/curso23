import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const bcrypt = require("bcrypt");

// use pagination plugin
mongoose.plugin(mongoosePaginate);

/**
 * @description Schema for Students collection
 * @typedef {Object} Student
 * @property {String} first_name - First name of the student
 * @property {String} last_name - Last name of the student
 * @property {String} email - Email address of the student
 * @property {String} password - Hashed password of the student
 * @property {Date} birth_date - Birth date of the student
 * @property {String} phone_number - Phone number of the student
 * @property {Array<String>} courses - List of course IDs the student is enrolled in
 * @property {Boolean} deleted - Soft delete flag
 * @property {Date} deleted_at - Timestamp of when the student was soft deleted
 * @property {mongoose.Schema.Types.ObjectId} deleted_by - Reference to the user who soft deleted the student
 * @property {Array<Object>} modifications_history - History of modifications made to the student document
 * @property {Date} modifications_history.modified_at - Timestamp of the modification
 * @property {Object} modifications_history.changes - Changes made during the modification
 * @property {mongoose.Schema.Types.ObjectId} modifications_history.modified_by - Reference to the user who made the modification
 */
export const studentSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[A-Za-záéíóúÁÉÍÓÚñÑ' ]+$/.test(v);
        },
      },
    },
    last_name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[A-Za-záéíóúÁÉÍÓÚñÑ' ]+$/.test(v);
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          const ageDifMs = Date.now() - v.getTime();
          const ageDate = new Date(ageDifMs);
          return Math.abs(ageDate.getUTCFullYear() - 1970) >= 5;
        },
      },
    },
    phone_number: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
      },
    },
    courses: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.every(
            (course) => typeof course === "string" && course.trim() !== ""
          );
        },
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    deleted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
  },
  { timestamps: true }
);

// Hashing the password before saving the student document
studentSchema.pre("save", async function (next) {
  const student = this;

  if (!student.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(student.password, salt);
    student.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare given password with the hashed password
studentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const Student = mongoose.model("Students", studentSchema);
