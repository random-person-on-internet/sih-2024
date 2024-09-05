import mongoose from "mongoose";

const iprSchema = new mongoose.Schema(
  {
    applicantName: {
      type: String,
      required: true,
    },
    applicantType: {
      type: String,
      enum: ["Researcher", "Startup"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    filingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    type: {
      type: String,
      enum: ["Patent", "Trademark", "Copyright", "Design"],
      required: true,
    },
    patentNumber: {
      type: String,
    },
    expirationDate: {
      type: Date,
    },
    investors: [
      {
        name: { type: String },
        affiliation: { type: String },
      },
    ],
    documents: [
      {
        fileName: {
          type: String,
          required: true,
        },
        fileURL: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Ipr = mongoose.model("Ipr", iprSchema);
