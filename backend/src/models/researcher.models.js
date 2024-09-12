import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const researcherSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    universityName: {
      type: String,
      required: true,
    },
    educationalQualification: {
      type: String,
      required: true,
    },
    fields: [
      {
        type: String,
        required: true,
      },
    ],
    ipr: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ipr",
      },
    ],
    researchPapers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResearchPaper",
      },
    ],
    contacts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contacts",
    },
    position: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePicture: {
      type: String, // cloudinary url
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

researcherSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

researcherSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// tokens
researcherSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
researcherSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Researcher = mongoose.model("Researcher", researcherSchema);
