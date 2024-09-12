import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
  },
  website: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  linkedInLink: {
    type: String,
  },
});

export const Contacts = mongoose.model("Contacts", contactsSchema);
